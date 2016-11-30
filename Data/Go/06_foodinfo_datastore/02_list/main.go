package main

import (
	"net/http"
	"io/ioutil"
	"fmt"
	"encoding/json"
	_ "github.com/go-sql-driver/mysql"
	"database/sql"
	"strconv"
)

type Foodlist struct {
	Foods []Food        `json:"food_list"`
}

type Food struct {
	Code     string `json:"code"`
	Seqcode  int `json:"seq_code"`
	Name     string `json:"food_name"`
	ThumbImg string `json:"thumb_img"`
	Kcal     string `json:"kcal"`
	SellCom  string `json:"sell_com"`
	Barcode  string `json:"barcode"`
	Volume   string `json:"volume"`
	Type     string `json:"food_type"`
	IngFirst string        `json:"ing_first"`
	NumFirst int `json:"num_first"`
}

const (
	DB_HOST = ""
	DB_NAME = ""
	DB_USER = /*"root"*/""
	DB_PASS = /*"password"*/""
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {

	dsn := DB_USER + ":" + DB_PASS + "@" + DB_HOST + "/" + DB_NAME + "?charset=utf8"

	db, err := sql.Open("mysql", dsn)
	check(err)
	defer db.Close()

	err = db.Ping()
	check(err)

	stmtIns, err := db.Prepare("Insert into tbl_store_foodproduct(code, seqcode, name, thumimg, kcal, sellcom, barcode, volume, type, ingfirst, numfirst) values( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
	check(err)
	defer stmtIns.Close()

	baseurl := "http://api.dbstore.or.kr:8880/foodinfo/list.do?uid=____YourID________&n=1200&p=1&s=food_name&o=u&c="

	client := &http.Client{}

	code := "F3F10" /*Choose what you want*/

	url := baseurl + code

	req, err := http.NewRequest("GET", url, nil)

	check(err)

	req.Header.Add("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
	req.Header.Add("x-waple-authorization", "")/*Your key here*/

	res, err := client.Do(req)
	check(err)

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	check(err)

	fmt.Println(string(body))

	var fl Foodlist

	json.Unmarshal(body, &fl)

	//fmt.Println(fl.Foods.len)

	for i := range fl.Foods {
		/*fmt.Println(fl.Foods[i].Code)
		fmt.Println(fl.Foods[i].Seqcode)
		fmt.Println(fl.Foods[i].Name)
		fmt.Println(fl.Foods[i].ThumbImg)
		fmt.Println(fl.Foods[i].Kcal)
		fmt.Println(fl.Foods[i].SellCom)
		fmt.Println(fl.Foods[i].Barcode)
		fmt.Println(fl.Foods[i].Volume)
		fmt.Println(fl.Foods[i].Type)
		fmt.Println(fl.Foods[i].IngFirst)
		fmt.Println(fl.Foods[i].NumFirst)*/


		stmtIns.Exec(
			fl.Foods[i].Code,
			fl.Foods[i].Seqcode,
			fl.Foods[i].Name,
			fl.Foods[i].ThumbImg,
			fl.Foods[i].Kcal,
			fl.Foods[i].SellCom,
			fl.Foods[i].Barcode,
			fl.Foods[i].Volume,
			fl.Foods[i].Type,
			fl.Foods[i].IngFirst,
			fl.Foods[i].NumFirst)
		fmt.Println(code+ " : "  +strconv.Itoa(i+1) + " complete")
	}

}
