from rest_framework import serializers
from .models import Attendance, Employee


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = "__all__"


class EmployeeListSerializer(serializers.ModelSerializer):
    total_present = serializers.IntegerField(read_only=True)

    class Meta:
        model = Employee
        fields = ["id", "department", "name", "email", "total_present"]


class EmployeeDetailSerializer(serializers.ModelSerializer):
    attendance = AttendanceSerializer(many=True)

    class Meta:
        model = Employee
        fields = ["id", "department", "name", "email", "attendance"]
