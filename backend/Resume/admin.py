from django.contrib import admin
from .models import CustomUser, UserDetails, ResumeTemplates


# Custom admin for CustomUser
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'role', 'created_at', 'updated_at')
    search_fields = ('username', 'email')  # Adjust to match CustomUser fields
    list_filter = ('created_at', 'updated_at', 'role')  # Ensure these fields exist
    readonly_fields = ('created_at', 'updated_at')  # Optional: Make timestamps read-only

# Custom admin for UserDetails
@admin.register(UserDetails)
class UserDetailsAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'firstname', 
        'lastname', 
        'created_by', 
        'updated_by', 
        'resume_template', 
        'created_at', 
        'updated_at'
    )
    search_fields = ('firstname', 'lastname')
    list_filter = ('created_at', 'updated_at', 'created_by')
    readonly_fields = ('created_at', 'updated_at')

@admin.register(ResumeTemplates)
class ResumeTemplatesAdmin(admin.ModelAdmin):
    list_display = ('id', 'created_at', 'updated_at')
    search_fields = ('id',)
    list_filter = ('created_at', 'updated_at')
