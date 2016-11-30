import requests
from bs4 import BeautifulSoup

r = requests.get('http://www.foodsafetykorea.go.kr/portal/safefoodlife/foodAditive/foodAdditiveBasisInfoDetail.do?page_gubun=2&adtv_cd=223')
soup = BeautifulSoup(r.text, 'lxml')

data = soup.find_all(["th","td"])

print(data.text)