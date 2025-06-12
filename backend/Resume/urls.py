from django.urls import re_path
from django.contrib import admin
from .views import LoginView, LogoutView, CreateResumeView, ResumeTemplatesView, UserDetailsView


urlpatterns = [
    re_path('admin/', admin.site.urls),
    re_path('login/',LoginView.as_view(),name='login'),
    re_path('logout/',LogoutView.as_view(),name='logout'),
    # re_path('signup/',SignupView.as_view(),name='signup'),
    re_path('api/user-template/',CreateResumeView.as_view(),name='UserTemplate'),
    re_path('api/resume-template/', ResumeTemplatesView.as_view(), name='ResumeTemplate'),
    re_path('api/user-details/', UserDetailsView.as_view(), name = 'UserDetails')
]