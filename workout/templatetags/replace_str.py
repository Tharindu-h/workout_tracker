from django import template

register = template.Library()

# maybe not needed anymore
# keep for now just in case 

@register.filter
def replace_str(value, arg):
  return value.replace(arg,'')