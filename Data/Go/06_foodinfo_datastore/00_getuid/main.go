package main

import (
	"net/http"
	"io/ioutil"
	"fmt"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main()  {

	url := "http://api.dbstore.or.kr:8880/foodinfo/get_id.do?api_key=DS64NUS4"

	client := &http.Client{}

	req, err := http.NewRequest("GET", url, nil)

	check(err)



	req.Header.Add("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
	req.Header.Add("x-waple-authorization", "")/* Your key*/

	res, err := client.Do(req)

	check(err)

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		panic(err.Error())
	}

	fmt.Println(string(body))

}
