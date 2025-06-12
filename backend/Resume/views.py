from django.shortcuts import render,redirect
from django.utils import timezone

# Create your views here.
import logging
from django.views import View
from django.contrib.auth.models import User # auth user model 
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator 
from django.views.decorators.csrf import csrf_exempt # restrict unverify access of web
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.hashers import make_password
from . models import UserDetails, ResumeTemplates
from rest_framework import serializers,status  # To send responses back to the client 
from rest_framework.response import Response# For defining HTTP response status codes
from rest_framework.views import APIView #The base class for our API view
from . serializers import UserSerializer, ResumeTemplatesSerializer, CustomUserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import BasicAuthentication
import json
from django.middleware.csrf import get_token
from rest_framework.response import Response


# Set up the logger
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')


CustomUser = get_user_model()
 
def standard_response(success, data=None, error_code=None, error_message=None, status_code=200):
    response = {
        'success': success,
        'data': data if data else [],
        'error': {
            'code': error_code,
            'message': error_message
        } if error_code or error_message else None
    }
    return Response(response, status=status_code)


@method_decorator(csrf_exempt,name='dispatch')
class LoginView(APIView):
        authentication_classes = []
        permission_classes = [AllowAny]

        def post(self, request):
                try:
    # Step 1: Check if the user exists
                        username = request.data.get('username')
                        password = request.data.get('password')
                        try:
                                user_obj = CustomUser.objects.get(username=username)
                        except CustomUser.DoesNotExist:
                                logger.error("Login failed: user not found")
                                return standard_response(success=False, error_code="USER_NOT_FOUND", error_message="User doesn't exist", status_code=status.HTTP_404_NOT_FOUND)
 
                        # Step 2: Check if the user is active
                        if not user_obj.is_active:
                                logger.error("Login failed: user is inactive")
                                return standard_response(success=False, error_code="ERR-403", error_message="User is inactive", status_code=status.HTTP_403_FORBIDDEN)
 
                        # Step 3: Authenticate the user (check password)
                        user = authenticate(request, username=username, password=password)
                        if user is None:
                                logger.error("Login failed: incorrect password")
                                return standard_response(success=False, error_code="ERR-400", error_message="Invalid Credentials", status_code=status.HTTP_400_BAD_REQUEST)
 
                        # Step 4: Login successful
                        request.session['user_id'] = user.id
                        request.session.set_expiry(3600)  # Session expires in 1 hour
                        csrf_token = {"csrftoken": get_token(request)}
                        user_details = {"user_id": user.id, "user_name": user.username, "user_role": user.role,
    "user_email": user.email }
                        logger.info(f"user {username} logged in successfully")
 
                        return standard_response(success=True, data=[user_details, csrf_token], status_code=status.HTTP_200_OK)
 
                except Exception as e:
                        logger.error(f"Login failed: {e}")
                        return standard_response(success=False, error_code="ERR-500", error_message=str(e), status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)



class LogoutView(APIView):
        authentication_classes = [BasicAuthentication]  # Use Basic Authentication
        permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

        def post(self,request):
                try:
                        logger.info(f"Logout attempt for user: {request.user}")
                        if IsAuthenticated: # it is a property check by default is_authenticated is True if user is in auth_user
                                logout(request)
                                # Clear session completely
                                request.session.flush()
                                logger.info(f"User {request.user} logged out successfully")
                                return standard_response(success=True, data={"message": "Logged out successfully"},status_code=200)
                        else:   
                                logger.warning("Logout attempt failed: No user logged in")
                                return standard_response(success=False, error_code="ERR-400", error_message="User not logged in", status_code=status.HTTP_400_BAD_REQUEST)
                except Exception as e:
                        return standard_response(success=False, error_code="ERR=500", error_message=str(e), status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
                    

class CreateResumeView(APIView):
        # authentication_classes = [BasicAuthentication]  # Use Basic Authentication
        permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

        def post(self, request) -> standard_response:
                logger.info(f"CreateResume API called by user: {request.user.username}")
                logger.debug(f"Received data: {request.data}")

                # if not request.user.is_authenticated:
                #         return standard_response(
                #                 success=False,
                #                 error_code="ERR-401",
                #                 error_message="User is not authenticated",
                #                 status_code=status.HTTP_401_UNAUTHORIZED
                #         )

                request_data = request.data
                try:
                        
                # Extract user details and validate with serializer
                        user_data = {"user_details": request_data['personaldetails']}
                        user_serializer = UserSerializer(data=user_data, context={'request': request})

                        if user_serializer.is_valid():
                                user_instance = user_serializer.save()['user_details']  # Use the actual instance here
                                logger.info(f"User Details Created Successfully for ID: {user_instance.id}")
                        else:
                                logger.error(f"User details creation failed: {user_serializer.errors}")
                                return standard_response(
                                success=False,
                                error_code="ERR-400",
                                error_message="Invalid user details",
                                status_code=status.HTTP_400_BAD_REQUEST
                                )

                        # Store all request_data in resume_details
                        user_instance.resume_details = request_data  # Save the entire request
                        user_instance.save(update_fields=["resume_details"])

                        logger.info("Resume details saved successfully.")
                        return standard_response(success=True, data="User details are stored", status_code=status.HTTP_200_OK)

                except Exception as e:
                        logger.error(f"Error in creating user details: {e}")
                        return standard_response(
                                success=False,
                                error_code="ERR-500",
                                error_message=str(e),
                                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
                        )

        def get(self, request) -> standard_response:
                user = request.query_params.get('user_id')
                user_role = None
                if user is None:
                        user = request.user.id
                try:
                        user_details = CustomUser.objects.get(pk=user)
                        user_role = getattr(user_details, 'role', None)
                except Exception:
                        return standard_response(success=False, error_code="ERR-404", error_message="User not found", status_code=status.HTTP_404_NOT_FOUND)
                # Fetch user data
                try:
                        latest_user_data = UserDetails.objects.filter(created_by=user).order_by('-created_at')
                        print(latest_user_data)
                        if not latest_user_data.exists():
                                message = "No Resumes" if user_role else "Please create a new Resume"
                                return standard_response(success=True, data=message, status_code=status.HTTP_200_OK)

                        user_data = [{"id": u.id, "resume_details": u.resume_details, "value": True} for u in latest_user_data]
                        return standard_response(success=True, data=user_data, status_code=status.HTTP_200_OK)

                except Exception as e:
                        return standard_response(success=False, error_code="ERR-500", error_message=str(e), status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

        def put(self, request) -> standard_response:
                logger.info(f"UpdateResume API called by user: {request.user.username}")
                logger.debug(f"Received data: {request.data}")
                resume_id = request.data.get('resume_id')
                # Check if the user is authenticated
                if not request.user.is_authenticated:
                        return standard_response(
                        success=False,
                        error_code="ERR-401",
                        error_message="User is not authenticated",
                        status_code=status.HTTP_401_UNAUTHORIZED
                        )
 
                request_data = request.data.get('resume_details')
                try:
                        # Check if the resume exists
                        user_instance = UserDetails.objects.get(id=resume_id)
                        if not user_instance:
                                return standard_response(success= False, error_code="ERR-404", error_message= "User Details not found", status_code= status.HTTP_404_NOT_FOUND)
                        logger.info(f"Resume found for ID: {resume_id}")
 
                        # Validate and update user details
                        user_data = {"user_details": request_data['personaldetails']}
                       
 
                        user_serializer = UserSerializer(instance=user_instance, data=user_data, context={'request': request}, partial=True)
                        if user_serializer.is_valid():
                                # print(1)
                                user_instance = user_serializer.save()
                                logger.info(f"User Details Updated Successfully for ID: {resume_id}")
                        else:
                                logger.error(f"User details update failed: {user_serializer.errors}")
                                return standard_response(
                                        success=False,
                                        error_code="ERR-400",
                                        error_message="Invalid user details",
                                        status_code=status.HTTP_400_BAD_REQUEST
                                )
 
                        # Update the resume details
                        user_instance.resume_details = {**(user_instance.resume_details or {}), **request_data}  
                        user_instance.save(update_fields=["resume_details"])
 
 
                        logger.info("Resume details updated successfully.")
                        return standard_response(success=True, data="Resume details updated successfully", status_code=status.HTTP_200_OK)
 
                except Exception as e:
                        logger.error(f"Error in updating user details: {e}")
                        return standard_response(
                        success=False,
                        error_code="ERR-500",
                        error_message=str(e),
                        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
                        )


        def delete(self, request) -> standard_response:
                template_id = request.GET.get('template_id')
                if not request.user.is_authenticated:
                        return standard_response(success=False, error_code="ERR-401", error_message="User is not authenticated", status_code=status.HTTP_401_UNAUTHORIZED)

                try:
                # Get the user record to delete by user_id
                        user_details = UserDetails.objects.get(id=template_id, created_by=request.user, updated_by=request.user)

                        # Delete the user details record
                        user_details.delete()

                        return standard_response(success=True, data="Template Details Deleted Successfully", status_code=status.HTTP_200_OK)

                except UserDetails.DoesNotExist:
                        return standard_response(success=False, error_code="ERR-404", error_message="Template Details Not Found", status_code=status.HTTP_404_NOT_FOUND)
                except Exception as e:
                        return standard_response(success=False, error_code="ERR-500", error_message=str(e), status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
                

class ResumeTemplatesView(APIView):
        authentication_classes = [BasicAuthentication]  # Use Basic Authentication
        permission_classes = [IsAuthenticated]  # Ensure the user is authenticated
        def post(self, request) -> standard_response:
                # if not request.user.is_authenticated:
                #         return standard_response(success=False, error_code="ERR-401", error_message="User is not authenticated", status_code=status.HTTP_401_UNAUTHORIZED)

                template_data = request.data.get("template")
                try:
                        # Check if the template field is missing in the payload
                        if not template_data:
                                return standard_response(
                                        success= False,
                                        error_code= "ERR-400",
                                        error_message= "Template field is required",
                                        status_code=status.HTTP_400_BAD_REQUEST)

                        # Wrap the template data in a dictionary as expected by the model
                        resume_template = {"template": template_data}

                        # Serialize the data
                        serializer = ResumeTemplatesSerializer(data=resume_template)

                        if serializer.is_valid():
                                serializer.save()
                                return standard_response(success = True, data ="Template Added Successfully", status_code=status.HTTP_201_CREATED)
                        return standard_response(success= False, error_code="ERR-400", error_message=serializer.errors, status_code=status.HTTP_400_BAD_REQUEST)
                except Exception as e: 
                        return standard_response(success= False, error_code="ERR-500", error_message=str(e), status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        
        def get(self, request) -> standard_response: 
                if not request.user.is_authenticated:
                        return standard_response(success=False, error_code="ERR-401", error_message="User is not authenticated", status_code=status.HTTP_401_UNAUTHORIZED)

                try: 
                        templates = ResumeTemplates.objects.all()
                        serializer = ResumeTemplatesSerializer(templates, many=True)
                        return standard_response(
                                success= True, 
                                data=  serializer.data, 
                                status_code= status.HTTP_200_OK)

                except Exception as e: 
                        return standard_response(success= False, error_code="ERR-500", error_message=str(e), status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        def delete(self, request) -> standard_response: 
                if not request.user.is_authenticated:
                        return standard_response(success=False, error_code="ERR-401", error_message="User is not authenticated", status_code=status.HTTP_401_UNAUTHORIZED)
                try: 
                        template_id = request.query_params.get('template_id')
                        print("template id is", template_id)
                        template = ResumeTemplates.objects.get(id=template_id)
                        template.delete()
                        return standard_response(success= True, data= "Template Deleted Successfully", status_code= status.HTTP_200_OK)

                except Exception as e: 
                        return standard_response(success= False, error_code="ERR-500", error_message=str(e), status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        def put(self, request) -> standard_response:
                if not request.user.is_authenticated:
                        return standard_response(success=False, error_code="ERR-401", error_message="User is not authenticated", status_code=status.HTTP_401_UNAUTHORIZED)
                
                try: 
                        template_id = request.data.get('template_id')
                        if not template_id: 
                                return standard_response(
                                        success= False, 
                                        error_code= "ERR-400", 
                                        error_message= "ID is not given",
                                        status_code= status.HTTP_400_BAD_REQUEST)
                        
                        template_model = ResumeTemplates.objects.get(id=template_id)
                        template_data = request.data.get('template')

                        template_model.template = template_data
                        template_model.updated_at = timezone.now()

                        template_model.save()

                        return standard_response(success= True, data = "Template Updated successfully", status_code= status.HTTP_200_OK)
                except Exception as e: 
                        return standard_response(success= False, error_code="ERR-500", error_message=str(e), status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserDetailsView(APIView):
        authentication_classes = [BasicAuthentication]  # Use Basic Authentication
        permission_classes = [IsAuthenticated]  # Ensure the user is authenticated
       
        def get(self, request) -> standard_response:
                if not request.user.is_authenticated:
                        return standard_response(success=False, error_code="ERR-401", error_message="User is not authenticated", status_code=status.HTTP_401_UNAUTHORIZED)
                try: 
                        users = CustomUser.objects.order_by('username').all()
                        serializer = CustomUserSerializer(users, many=True)
                        return standard_response(success= True, data=serializer.data, status_code= status.HTTP_200_OK)
                except Exception as e: 
                        return standard_response(success= False, error_code="ERR-500", error_message=str(e), status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        def post(self, request) -> standard_response:
                if not request.user.is_authenticated:
                        return standard_response(success=False, error_code="ERR-401", error_message="User is not authenticated", status_code=status.HTTP_401_UNAUTHORIZED)
                try:
                        first_name=request.data.get("first_name")
                        last_name = request.data.get('last_name')
                        password=request.data.get("password")
                        email=request.data.get("email")
                        role = request.data.get('role')
                        if not role:
                                role = 'user'

                        username = f'{first_name}{last_name}' 
                        print(username)
                        # Validate required fields
                        if not password:
                                logger.warning("Signup failed: password is required")
                                return standard_response(success=False, error_code="ERR-400", error_message="Password is required", status_code=status.HTTP_400_BAD_REQUEST)
                        if not email:
                                logger.warning("Signup failed: email is required")
                                return standard_response(success=False, error_code="ERR-400", error_message="Email is required", status_code=status.HTTP_400_BAD_REQUEST)

                        # Check if a user with the same username or email already exists
                        
                        if CustomUser.objects.filter(username=username).exists():
                                return standard_response(success=False, error_code="ERR-400", error_message="Username already taken", status_code=status.HTTP_400_BAD_REQUEST)
                        elif CustomUser.objects.filter(email=email).exists():
                                return standard_response(success=False, error_code="ERR-400", error_message="Email already registered", status_code=status.HTTP_400_BAD_REQUEST)

                        else:
                        #creating new user by creating instance of customuser   
                                if username:
                                        user = CustomUser(
                                                username=username,
                                                password=make_password(password),
                                                email=email,
                                                first_name=first_name, 
                                                last_name=last_name,
                                                role=role, 
                                        )
                                        user.save()
                                        logger.info(f"User {username} is Created Successfully")
                                        return standard_response(success=True, data={"message": "User Created Successfully"},status_code=status.HTTP_201_CREATED)

                                else:
                                        return standard_response(success=False, error_code="ERR-400", error_message="Username is required", status_code=status.HTTP_400_BAD_REQUEST)
                except Exception as e:
                        return standard_response(success= False, error_code="ERR-500", error_message=str(e), status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

        def put(self, request): 
                if not request.user.is_authenticated:
                        return standard_response(success=False, error_code="ERR-401", error_message="User is not authenticated", status_code=status.HTTP_401_UNAUTHORIZED)
                try: 
                        user_id = request.data.get('user_id')
                        user = CustomUser.objects.get(pk=user_id)
                except CustomUser.DoesNotExist:
                        return standard_response(success= False, error_code= "ERR-404", error_message="User not found",status_code=status.HTTP_404_NOT_FOUND)
                
                serializer = CustomUserSerializer(user, data=request.data, partial=True)
                if serializer.is_valid():
                        serializer.save()
                        return standard_response(success= True, data= "User Updated Successfully",status_code=status.HTTP_200_OK)
                return standard_response(success= False,error_code= "ERR-400", error_message= serializer.errors, status_code=status.HTTP_400_BAD_REQUEST)
        
        def delete(self, request):
                if not request.user.is_authenticated:
                        return standard_response(success=False, error_code="ERR-401", error_message="User is not authenticated", status_code=status.HTTP_401_UNAUTHORIZED)
                try: 
                        user_id = request.query_params.get('user_id')
                        user = CustomUser.objects.get(pk=user_id)
                        user.delete()
                        return standard_response(success= True, data= "User Removed Successfully",status_code=status.HTTP_200_OK)
                except Exception as e:
                        return standard_response(success= False,error_code= "ERR-500", error_message= str(e), status_code=status.HTTP_500_INTERNAL_SERVER_ERRORs)