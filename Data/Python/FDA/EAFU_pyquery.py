import requests
from pyquery import PyQuery

for page_no in range(1, 100):
    r = requests.get("http://www.accessdata.fda.gov/scripts/fcn/fcnNavigation.cfm?rpt=eafusListing&page={}".format(page_no))
    pq = PyQuery(r.text)

    elements = [x for x in pq("td.report").items()]

 #   for i in range(len(elements) / 5):
 #       print [e.text() for e in elements[i * 5:(i * 5) + 5]]