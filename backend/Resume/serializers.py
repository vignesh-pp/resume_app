from rest_framework import serializers
from .models import UserDetails, ResumeTemplates, CustomUser


# ResumeTemplatesSerializer
class ResumeTemplatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeTemplates
        fields = ['id', 'template', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

# UserDetailsSerializer
class UserDetailsSerializer(serializers.ModelSerializer):
    resume_template = serializers.PrimaryKeyRelatedField(
        queryset=ResumeTemplates.objects.all(),
        required=False,
        allow_null=True
    )  # Handle foreign key as a primary key field

    class Meta:
        model = UserDetails
        fields = '__all__'

    def validate_resume_template(self, value):
        if value and not ResumeTemplates.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Invalid resume template.")
        return value


# Composite Serializer for handling all models in a single request
class UserSerializer(serializers.Serializer):
    user_details = UserDetailsSerializer()

    def create(self, validated_data):
        user = self.context['request'].user  # Get the user from the request context
        user_data = validated_data.pop('user_details')

        # Ensure created_by and updated_by are assigned properly
        user_details = UserDetails.objects.create(
            created_by=user,
            updated_by=user,
            **user_data
        )

        return {
            'user_details': user_details,
        }
    
    def update(self, instance, validated_data):
        user = self.context['request'].user  # Get the user from the request context
        user_data = validated_data.get('user_details', {})
        # Ensure the instance is updated correctly

        for attr, value in user_data.items():

            setattr(instance, attr, value)

        instance.updated_by = user  # Update the modified user
        instance.save()  # <-- Correct indentation
        return instance  # <-- Correct return
    
    
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
