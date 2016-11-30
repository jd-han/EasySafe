package main

import (
	"net/http"
	"fmt"
)

/*
const(
	header = "Content-Type: application/x-www-form-urlencoded; charset=UTF-8 x-waple-authorization:MzIzLTE0Nzk5NTY2NTI2MjctOWQ2OWViMjQtOTIzYS00MWQ3LWE5ZWItMjQ5MjNhOTFkN2E1"
url = "http://api.dbstore.or.kr:8880/foodinfo"
uid := "KK6ZY6JC"
)
*/

func main() {
	client := &http.Client{}
	url := "http://api.dbstore.or.kr:8880/foodinfo/get_id.do?api_key=DS64NUS4"

	req, _ := http.NewRequest("GET", url, nil)


	req.Header.Add("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
	req.Header.Add("x-waple-authorization", "MS0xMzY1NjY2MTAyNDk0LTA2MWE4ZDgyLTZhZmMtNGU5OS05YThkLTgyNmFmYzVlOTkzZQ==")

	fmt.Println(req.Header);

	res, _ := client.Do(req)

	fmt.Print(res.Body);

	defer res.Body.Close()

}