package main

import "fmt"

const (
	//url = "http://openapi.nier.go.kr/serv_open/service/ncis/getClu0402?search_nm=*&numOfRows=99999999&pageNo=1&ServiceKey=jqr440GH5UaSsHI0KoG%2FbHkQ2nMnemX9VOU%2BZ0%2B7P1PpOSAWqbCqNlFW05vr%2BKY6Mktje%2BWh4co5ExztGxdxfA%3D%3D"

	baseUrl = "http://openapi.nier.go.kr/serv_open/service/ncis/getClu0402?"
	search_nm = "search_nm="
	numOfRows = "numOfRows="
	pageNo = "pageNo="
	returnType = "_returnType=json"
	serviceKey = "ServiceKey=jqr440GH5UaSsHI0KoG%2FbHkQ2nMnemX9VOU%2BZ0%2B7P1PpOSAWqbCqNlFW05vr%2BKY6Mktje%2BWh4co5ExztGxdxfA%3D%3D"
)
func main() {
	keyword := []string{"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"}

	for _, key := range keyword{
		url := baseUrl + search_nm + key +"&"+ numOfRows + "9999999" + "&" + pageNo + "1" + "&" + serviceKey
		fmt.Println(url)
	}
}
