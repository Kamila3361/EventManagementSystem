from django.urls import path, include
from .views import *

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('sign_up/', SignUpView.as_view(), name='sign-up'),
    path('all/', EventsView.as_view(), name='get-events'),
    path('<int:pk>/', EventDetailView.as_view(), name='get-detail-event'),
    path('<int:pk>/seats', EventSeatsView.as_view(), name='get-event-seats'),
    path('<int:pk>/booking', EventBookingView.as_view(), name='book-event-seats'),
    path('booking/', BookingView.as_view(), name='get-my-booking'),
    path('booking/<int:book_id>/cancel', BookingCancellationView.as_view(), name='cancel-booking'),
]