package main

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"fmt"
	"strconv"
	"net/http"
	"io/ioutil"
	"encoding/json"
	"strings"
	"bufio"
	"os"
)

const (
	DB_HOST = ""
	DB_NAME = ""
	DB_USER = /*"root"*/""
	DB_PASS = /*""*/""


	Uid = "_______" // Your uid here
	Header = "" //Your header here

)

type Query struct {
	Inglist       []Ing        `json:"ing_list"`
	Conponentlist []Conponents        `json:"mat_list"`
}
type Ing struct {
	Name   string `json:"name"`
	Volexp string        `json:"vol_str"`
	Vol    int        `json:"vol"`
	Pervol int `json:"per_vol"`
}
type Conponents struct {
	Name   string        `json:"name"`
	Pervol int `json:"per_vol"`
}

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

	var code string
	var seqcode string
	rows, err := db.Query("select code, seqcode from tbl_store_foodproduct where components is null;")
	check(err)
	defer rows.Close()

	stmtIns, err := db.Prepare("update tbl_store_foodproduct set components = ? where code = ? and seqcode = ?")
	check(err)
	defer stmtIns.Close()

	baseurl := "http://api.dbstore.or.kr:8880/foodinfo/food_detail.do?"

	client := &http.Client{}

	var resStr Query

	i := 1;

	for rows.Next() {
		err := rows.Scan(&code, &seqcode)
		check(err)
		fmt.Println("code : " + code + "\t seqcode : " + seqcode)

		url := baseurl + "uid=" + Uid + "&c=" + code + "&s=" + seqcode

		req, err := http.NewRequest("GET", url, nil)

		req.Header.Add("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
		req.Header.Add("x-waple-authorization", Header)

		res, err := client.Do(req)
		check(err)

		defer res.Body.Close()

		body, err := ioutil.ReadAll(res.Body)
		check(err)

		//fmt.Println(string(body))

		if strings.Contains(string(body), "call rejected") {
			reader := bufio.NewReader(os.Stdin)
			fmt.Print("Enter text: ")
			text, _ := reader.ReadString('\n')
			fmt.Println(text)
		}

		json.Unmarshal(body, &resStr)

		var components = ""

		for j := range resStr.Conponentlist {
			components += resStr.Conponentlist[j].Name + " "
		}


		stmtIns.Exec(components, code, seqcode)
		fmt.Println(strconv.Itoa(i) + "\t 개 입력완료" + "\t code : " + code + "\t seqcode : " + seqcode + "\t components : " + components)
		i++

	}

}