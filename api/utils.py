

import random


# make unique path for object
def make_path(_prefix, model, slug_length=7, unique=True):
    allowed_chars = '1234567890qwertyuiopasdfghjklzxcvbnm'
    prefix = _prefix
    path = ''
    for _ in range(slug_length):
        path += allowed_chars[random.randint(0, len(allowed_chars)-1)]
    path = prefix + path
    if unique:
        if model.objects.filter(path=path).exists():
            make_path(_prefix, model, slug_length, unique)
    return path
