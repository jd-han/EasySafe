import requests
from bs4 import BeautifulSoup
import MySQLdb

#def save_EAFU(type, mainterm, cas):
    # Open database connection
db = MySQLdb.connect(host = "192.168.0.202", user="con", passwd="concon", db="easysafetest")
db.set_character_set('utf8')

    # Prepare a cursor object using cursor() method
cursor = db.cursor()

    # Prepare SQL query to INSERT a record into the database
sql="insert into tb_eafu(type, mainterm, cas) values (%s,%s,%s)"

r = requests.get("http://www.accessdata.fda.gov/scripts/fcn/fcnNavigation.cfm?rpt=eafusListing&displayAll=true")
soup = BeautifulSoup(r.text, 'lxml')

addtives =soup.findAll('td', attrs={'class':'report'})


for i in range(int(len(addtives)/5)):
    type = addtives[i*5].text
    mainterm = (addtives[i*5+2].text)
    cas = addtives[i*5+3].text
    print(type + "\t" + mainterm + "\t" + cas )


    try:
        # Execute the SQL command
        cursor.execute(sql, (type, mainterm, cas))

        # Commit changes in the database
        db.commit()

        # cursor.execute("""SELECT title, article, date, writer, vcnt FROM document""")
        # print(cursor.fetchall())
    except Exception as e:
        print(str(e))
        # Rollback in case there is any error
        db.rollback()

        # Disconnect from database

db.close()