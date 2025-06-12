from django.db import models
from django.contrib.auth.models import AbstractUser
import django.utils.timezone

# auth user table
class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('user', 'User'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    created_at = models.DateTimeField(default=django.utils.timezone.now)
    updated_at = models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return f"{self.username} - {self.role}"


# Resume templates table
class ResumeTemplates(models.Model):
    template = models.JSONField(null=False)
    created_at = models.DateTimeField(default=django.utils.timezone.now)
    updated_at = models.DateTimeField(default=django.utils.timezone.now)

    class Meta:
        db_table = 'resume_template'


# User details model which gets personal details
class UserDetails(models.Model):
    firstname = models.CharField(max_length=25)
    lastname = models.CharField(max_length=25)
    resume_details = models.JSONField(blank=True, null=True)
    resume_template = models.ForeignKey(
        ResumeTemplates, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='user_details'
    )  # Foreign key to ResumeTemplates
    created_at = models.DateTimeField(default=django.utils.timezone.now)
    created_by = models.ForeignKey(
        CustomUser, 
        on_delete=models.CASCADE, 
        default=10, 
        related_name='created_userdetails'
    )
    updated_at = models.DateTimeField(default=django.utils.timezone.now)
    updated_by = models.ForeignKey(
        CustomUser, 
        on_delete=models.CASCADE, 
        default=10, 
        related_name='updated_userdetails'
    )

    class Meta:
        db_table = 'user_details'

    def __str__(self):
        return f"firstname: {self.firstname}, lastname: {self.lastname}"
