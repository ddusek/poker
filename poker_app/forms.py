from django import forms


class StartGameForm(forms.Form):
    players = forms.IntegerField(label='players', max_value=8)
    chips = forms.IntegerField(label='chips', max_value=1000000)
