from django.shortcuts import render
from rest_framework import generics, status
from .models import Event, Seat, Booking
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class SignUpView(generics.CreateAPIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully.'})
        return Response(serializer.errors, status=400)

class EventsView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventsSerializer
    permission_classes = [AllowAny]

class EventDetailView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny]

class EventSeatsView(generics.ListAPIView):
    serializer_class = SeatSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        event_id = self.kwargs['pk']
        return Seat.objects.filter(event_id=event_id)

class EventBookingView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        event_id = kwargs.get('pk')
        seat_id = request.data.get('seat')
        user = request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if Booking.objects.filter(event_id=event_id, seat_id=seat_id).exists():
            return Response({'error': 'This seat is already booked!'}, status=status.HTTP_400_BAD_REQUEST)

        seat = Seat.objects.get(id=seat_id)
        
        if seat.booked:
            return Response({'error': 'This seat is already marked as booked!'}, status=status.HTTP_400_BAD_REQUEST)

        seat.booked = True
        seat.save()

        serializer.save(event_id=event_id, seat_id=seat_id, user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class BookingCancellationView(generics.DestroyAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Booking.objects.all()
        return Booking.objects.filter(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        booking = get_object_or_404(Booking, id=kwargs.get('book_id'))
        seat = Seat.objects.get(id=booking.seat_id)

        seat.booked = False
        seat.save()

        self.perform_destroy(booking)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class BookingView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Booking.objects.filter(user=user)