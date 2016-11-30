package main

import (
	"net/http"
	"io/ioutil"
	"fmt"
)

type list struct {
	result string `json:"result"`
	foodTypeList []foodType `json:"food_list"`
}

type foodType struct {
	code string `json:"code"`
	codeName string `json:"code_name"`
	count string `json:"count"`
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {

	url := ""

	client := &http.Client{}

	req, err := http.NewRequest("GET", url, nil)

	check(err)

	req.Header.Add("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
	req.Header.Add("x-waple-authorization", "") /*Your key*/

	res, err := client.Do(req)

	check(err)

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		panic(err.Error())
	}

	fmt.Println(string(body))

}
