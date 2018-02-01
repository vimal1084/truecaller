import requests
from django import forms
from django.shortcuts import get_object_or_404, render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import time

class TruecallerForm(forms.Form):
    number = forms.CharField(max_length=50)


@csrf_exempt
def truecaller(request):
    if request.method == 'POST':
        form = TruecallerForm(request.POST)
        
        number = form['number'].value()
        if form.is_valid():
            time.sleep(1)
            if number == '8122195911':                
                return JsonResponse(
                    {
                        'number': number,
                        'score': 17,
                        'name': 'Credit card'
                    }
                )
            elif number == '8122195912':
                return JsonResponse(
                    {
                        'number': number,
                        'score': 456,
                        'name': 'Home loan'
                    }
                )
           

            headers = {
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.8',
                'authorization': 'Bearer d~8xbroRYF46z9RzA3thCX4Ko3v3IbWK',
                'accept': 'application/json, text/plain, */*',
                'referer': 'https://www.truecaller.com/search/',
                'authority': 'www.truecaller.com',
                'cookie': '__cfduid=dd833f868f56dc50a3fedee58c431cc821510561739; G_ENABLED_IDPS=google; G_AUTHUSER_H=0; _ga=GA1.2.1235192112.1510561740; _gid=GA1.2.727492758.1511333528; XLBS3=XLBS3|WhVYI|WhVHq; _gat=1',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
            }

            params = (
                ('type', '4'),
                ('countryCode', 'in'),
                ('q', number),
            )
            try:
                res = requests.get('https://www.truecaller.com/api/search', headers=headers, params=params)
            except:
                pass

            content = json.loads(res.content.decode('utf8')).get('data', [])
            truecaller_data = {
                'number': number,
                'score': content[0].get('phones')[0].get('spamScore', 0),
                'name': content[0].get('name', 'unknown')
            }

            return JsonResponse(truecaller_data)
    else:
        data = 'no data'

    form = TruecallerForm()
    return render(request, 'sharktank/truecaller.html', {'form': form, 'info': data})
