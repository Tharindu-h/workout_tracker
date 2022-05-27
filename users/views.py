from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import UserRegisterForm

def register(request):
  print("here")
  if request.method == 'POST':
    form = UserRegisterForm(request.POST)
    if form.is_valid():
      form.save()
      username = form.cleaned_data.get('username')
      messages.success(request, f'Account Created For { username}! You Are Now Able To Login')
      return redirect('login')
  else:
    form = UserRegisterForm()
  return render(request, 'users/register.html', { 'form': form })
