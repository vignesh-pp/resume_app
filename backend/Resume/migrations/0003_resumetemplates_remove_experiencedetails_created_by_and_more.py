# Generated by Django 5.1.3 on 2025-01-22 06:47

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Resume', '0002_educationaldetails_created_at_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ResumeTemplates',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('template', models.JSONField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'db_table': 'resume_template',
            },
        ),
        migrations.RemoveField(
            model_name='experiencedetails',
            name='created_by',
        ),
        migrations.RemoveField(
            model_name='experiencedetails',
            name='resume_id',
        ),
        migrations.RemoveField(
            model_name='experiencedetails',
            name='updated_by',
        ),
        migrations.RemoveField(
            model_name='experiencedetails',
            name='user',
        ),
        migrations.RemoveField(
            model_name='projectdetails',
            name='created_by',
        ),
        migrations.RemoveField(
            model_name='projectdetails',
            name='resume_id',
        ),
        migrations.RemoveField(
            model_name='projectdetails',
            name='updated_by',
        ),
        migrations.RemoveField(
            model_name='projectdetails',
            name='user',
        ),
        migrations.RemoveField(
            model_name='resumedetails',
            name='created_by',
        ),
        migrations.RemoveField(
            model_name='resumedetails',
            name='updated_by',
        ),
        migrations.RemoveField(
            model_name='resumedetails',
            name='user',
        ),
        migrations.RemoveField(
            model_name='userresumes',
            name='created_by',
        ),
        migrations.RemoveField(
            model_name='userresumes',
            name='updated_by',
        ),
        migrations.RemoveField(
            model_name='userresumes',
            name='user',
        ),
        migrations.RemoveField(
            model_name='userdetails',
            name='city',
        ),
        migrations.RemoveField(
            model_name='userdetails',
            name='country',
        ),
        migrations.RemoveField(
            model_name='userdetails',
            name='date_of_birth',
        ),
        migrations.RemoveField(
            model_name='userdetails',
            name='languages',
        ),
        migrations.RemoveField(
            model_name='userdetails',
            name='mail',
        ),
        migrations.RemoveField(
            model_name='userdetails',
            name='phone',
        ),
        migrations.RemoveField(
            model_name='userdetails',
            name='pincode',
        ),
        migrations.RemoveField(
            model_name='userdetails',
            name='status',
        ),
        migrations.AddField(
            model_name='userdetails',
            name='resume_details',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userdetails',
            name='resume_template',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user_details', to='Resume.resumetemplates'),
        ),
        migrations.DeleteModel(
            name='EducationalDetails',
        ),
        migrations.DeleteModel(
            name='ExperienceDetails',
        ),
        migrations.DeleteModel(
            name='ProjectDetails',
        ),
        migrations.DeleteModel(
            name='ResumeDetails',
        ),
        migrations.DeleteModel(
            name='UserResumes',
        ),
    ]
