

import random


def make_path(_prefix, model=None, slug_length=7):
    """generates random path and name according to parameters

    :param _prefix: prefix to add to generated path
    :param model: model in which to check duplicity. If None, no checking will be done, defaults to None
    :param slug_length: length of slug to generate, defaults to 7
    :return: path, name (path contains _prefix, name does not)
    """
    allowed_chars = '1234567890qwertyuiopasdfghjklzxcvbnm'
    prefix = _prefix
    path = ''
    name = ''
    for _ in range(slug_length):
        name += allowed_chars[random.randint(0, len(allowed_chars) - 1)]
    path = prefix + name
    if model is not None:
        if model.objects.filter(path=path).exists():
            make_path(_prefix, model, slug_length)
    return path, name
