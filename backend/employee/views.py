from django.db.models import Q, Count, Prefetch
from django.shortcuts import get_object_or_404
from rest_framework import mixins, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from employee.models import Attendance, Employee
from employee.serializers import (
    AttendanceSerializer,
    EmployeeDetailSerializer,
    EmployeeListSerializer,
)


class EmployeeViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Employee.objects.annotate(
        total_present=Count("attendance", filter=Q(attendance__status="present"))
    ).order_by("id")
    serializer_class = EmployeeListSerializer

    def retrieve(self, request, pk):
        month_year = request.query_params.get("month_year")

        month, year = None, None
        if month_year:
            month, year = month_year.split("-")

        employee = get_object_or_404(
            Employee.objects.prefetch_related(
                Prefetch(
                    "attendance",
                    queryset=Attendance.objects.order_by("-date").filter(
                        date__month=month, date__year=year
                    ),
                )
            ),
            id=pk,
        )
        serializer = EmployeeDetailSerializer(employee)
        return Response(serializer.data)

    @action(methods=["post"], detail=True)
    def mark_attendance(self, request, pk=None):
        employee = get_object_or_404(Employee, pk=pk)
        try:
            attendance = Attendance.objects.filter(
                employee=pk, date=request.data["date"]
            ).get()
        except Attendance.DoesNotExist:
            attendance = None

        request.data["employee"] = pk
        serializer = AttendanceSerializer(attendance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
