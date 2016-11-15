import requests
from bs4 import BeautifulSoup

r = requests.get("http://www.accessdata.fda.gov/scripts/fcn/fcnNavigation.cfm?rpt=eafusListing&displayAll=true")
soup = BeautifulSoup(r.text, 'lxml')

addtives =soup.findAll('td', attrs={'class':'report'})

for i in range(int(len(addtives)/5)):
    print(addtives[i*5].text + "\t" + addtives[i*5+1].text + "\t" + addtives[i*5+2].text + "\t"+ addtives[i*5+3].text + "\t"+addtives[i*5+4].text + "\n")
    type = addtives[i*5].text
    mainterm = addtives[i*5+1].text
    cas = addtives[i*5+2].text



