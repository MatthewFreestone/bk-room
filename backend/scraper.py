import requests
from bs4 import BeautifulSoup

PHP_COOKIE = '<Grab from chrome>'

start = 24
end = 51

res_dict = {}

for i in range(start, end):
    url = 'https://spider.eng.auburn.edu/makerspace/reserve/index.php?view=object&loc=bk&object=' + str(i)
    headers = {
        'cookie': 'PHPSESSID=' + PHP_COOKIE,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'
    }
    r = requests.get(url, headers=headers)
    if r.status_code != 200:
        print(f'{i}: Error: {r.status_code}')
        continue
    soup = BeautifulSoup(r.text, 'html.parser')
    room_num = soup.find('h3').text
    res_dict[room_num] = i

print(res_dict)