from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    name = models.CharField(max_length=100, default='name')
    description = models.TextField()
    location = models.CharField(max_length=100)
    date = models.DateField()
    start = models.TimeField()
    duration = models.IntegerField()
    price = models.IntegerField()
    image = models.CharField(max_length=1000, default='../')

    def __str__(self):
        return self.name
    
class Seat(models.Model):
    row_letter = models.CharField(max_length=1)
    seat_number = models.IntegerField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    booked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.row_letter}{self.seat_number} {self.event}"

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE)
    booked_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('event', 'seat')

    def __str__(self):
        return f"Booking for {self.event} on seat {self.seat}"
