from pipes import Template
from django import template

register =  template.Library()

@register.filter
def index(arr, index):
	try:
		return arr[index]
	except:
		return