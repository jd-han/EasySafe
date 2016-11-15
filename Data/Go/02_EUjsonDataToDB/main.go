package main

import (
	"io/ioutil"
	"encoding/json"
	_ "github.com/go-sql-driver/mysql"
	"database/sql"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

type Items struct {
	Item []struct {
		Context string        `json:"@context"`
		Enum    string        `json:"http://ec.europa.eu/semantic_webgate/dataset/additives/resource/eNumber"`
		Name    string        `json:"http://ec.europa.eu/semantic_webgate/dataset/additives/resource/additiveName"`
		Id      string        `json:"http://ec.europa.eu/semantic_webgate/dataset/additives/resource/id"`
		Group   string        `json:"http://ec.europa.eu/semantic_webgate/dataset/additives/resource/isGroup"`
		Subject string        `json:"@subject"`
	}        `json:"items"`
}
const (
	DB_HOST = "tcp(192.168.0.202:3306)"
	DB_NAME = "easysafetest"
	DB_USER = /*"root"*/ "con"
	DB_PASS = /*""*/ "concon"
)

func main() {

	dat, err := ioutil.ReadFile("C:/Users/human/Downloads/FoodAdditives/additives.rdf.additive.json")
	check(err)

	//fmt.Println(string(dat))
	dsn := DB_USER + ":" + DB_PASS + "@" + DB_HOST + "/" + DB_NAME + "?charset=utf8"

	db, err := sql.Open("mysql", dsn)
	check(err)
	defer db.Close()

	err = db.Ping()
	check(err)

	stmtIns, err := db.Prepare("Insert into tb_eu_foodaddtive(name, enum, id) values( ?, ?, ?)")
	check(err)
	defer stmtIns.Close()

	var elements Items
	json.Unmarshal(dat, &elements)
	for i := range elements.Item {

		stmtIns.Exec(elements.Item[i].Name, elements.Item[i].Enum, elements.Item[i].Id)
	}

}