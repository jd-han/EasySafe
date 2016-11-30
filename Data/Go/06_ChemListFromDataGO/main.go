package main

import (
	"net/http"
	"encoding/xml"
	_ "github.com/go-sql-driver/mysql"
	"io/ioutil"
	"database/sql"
	"fmt"
	//"strconv"
)

const (
	//url = "http://openapi.nier.go.kr/serv_open/service/ncis/getClu0402?search_nm=*&numOfRows=99999999&pageNo=1&ServiceKey=jqr440GH5UaSsHI0KoG%2FbHkQ2nMnemX9VOU%2BZ0%2B7P1PpOSAWqbCqNlFW05vr%2BKY6Mktje%2BWh4co5ExztGxdxfA%3D%3D"

	baseUrl = "http://openapi.nier.go.kr/serv_open/service/ncis/getClu0402?"
	search_nm = "search_nm="
	numOfRows = "numOfRows="
	pageNo = "pageNo="
	returnType = "_returnType=json"
	serviceKey = "ServiceKey=jqr440GH5UaSsHI0KoG%2FbHkQ2nMnemX9VOU%2BZ0%2B7P1PpOSAWqbCqNlFW05vr%2BKY6Mktje%2BWh4co5ExztGxdxfA%3D%3D"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

type Query struct {
	Header Header	`xml:"header"`
	Body   Body	`xml:"body"`
}

type Header struct {
	ResultCode string        `xml:"resultCode"`	//	결과코드
	ResultMsg  string        `xml:"resultMsg"`	//	결과메세지
}

type Body struct {
	Items      Items        `xml:"items"`
	NumOfRows  string        `xml:"numOfRows"`  //	한 페이지 결과 수
	PageNo     string        `xml:"pageNo"`     //	페이지 번호
	TotalCount string        `xml:"totalCount"` //	전체 결과 수
}

type Items struct {
	Item []Item	`xml:"item"`
}

type Item struct {
	CasNo                string        `xml:"casno"`                //	CAS번호
	Keno                 string        `xml:"keno"`                 //	기존화학물질
	Chmclskoreannm       string        `xml:"chmclskoreannm"`       //	화학물질	국문명
	Chmclsengnm          string        `xml:"chmclsengnm"`          //	화학물질 영문명
	Chmclskoreannm2      string        `xml:"chmclskoreannm2"`      //	화학물질 국문명2
	Chmclsengnm2         string        `xml:"chmclsengnm2"`         //	화학물질영문명2
	Mttrno01             string        `xml:"mttrno01"`             //	물질번호_기존화학물질
	Mttrno02             string        `xml:"mttrno02"`             //	물질번호_유독물에 등에 해당하지 아니하는 물질
	Mttrno03             string        `xml:"mttrno03"`             //	물질번호_유독물
	Mttrno04             string        `xml:"mttrno04"`             //	물질번호_관찰물질
	Mttrno05             string        `xml:"mttrno05"`             //	물질번호_취급제한물질
	Mttrno06             string        `xml:"mttrno06"`             //	물질번호_취급금지물질
	Mttrno08             string        `xml:"mttrno08"`             //	CLASS08
	Mttrno10             string        `xml:"mttrno10"`             //	CLASS10
	Mttrno11             string        `xml:"mttrno11"`             //	CLASS11
	Mttrno12             string        `xml:"mttrno12"`             //	CLASS12
	Mttrno14             string        `xml:"mttrno14"`             //	CLASS14
	Mttrno16             string        `xml:"mttrno16"`             //	물질번호_유독물
	Mttrno17             string        `xml:"mttrno17"`             //	물질번호_관찰물질
	Mttrno18             string        `xml:"mttrno18"`             //	물질번호_취급제한물질
	Mttrno19             string        `xml:"mttrno19"`             //	물질번호_취급금지물질
	Continfo03           string        `xml:"continfo03"`           //	혼합물(제품)함량정보_유독물
	Continfo04           string        `xml:"continfo04"`           //	혼합물(제품)함량정보_관찰물질
	Continfo05           string        `xml:"continfo05"`           //	혼합물(제품)함량정보_취급제한물질
	Continfo06           string        `xml:"continfo06"`           //	혼합물(제품)함량정보_취급금지물질
	Continfo16           string        `xml:"continfo16"`           //	혼합물(제품)함량정보_유독물
	Continfo17           string        `xml:"continfo17"`           //	혼합물(제품)함량정보_관찰물질
	Continfo18           string        `xml:"continfo18"`           //	혼합물(제품)함량정보_취급제한물질
	Continfo19           string        `xml:"continfo19"`           //	혼합물(제품)함량정보_취급금지물질
	Lmttinfo03           string        `xml:"lmttinfo03"`           //	금지 또는 제한 내용_유독물
	Lmttinfo04           string        `xml:"lmttinfo04"`           //	금지 또는 제한 내용_관찰물질
	Lmttinfo05           string        `xml:"lmttinfo05"`           //	금지 또는 제한 내용_취급제한물질
	Lmttinfo06           string        `xml:"lmttinfo06"`           //	금지 또는 제한내용_취급금지물질
	Lmttinfo16           string        `xml:"lmttinfo16"`           //	금지 또는 제한내용_유독물
	Lmttinfo17           string        `xml:"lmttinfo17"`           //	금지 또는 제한내용_관찰물질
	Lmttinfo18           string        `xml:"lmttinfo18"`           //	금지 또는 제한내용_취급제한물질
	Lmttinfo19           string        `xml:"lmttinfo19"`           //	금지 또는 제한내용_취급금지물질
	Ntfcde01             string        `xml:"ntfcde01"`             //	고시일자_기존화학물질
	Ntfcde03             string        `xml:"ntfcde03"`             //	고시일자_유독물
	Ntfcde04             string        `xml:"ntfcde04"`             //	고시일자_관찰물질
	Ntfcde05             string        `xml:"ntfcde05"`             //	고시일자_취금제한물질
	Ntfcde06             string        `xml:"ntfcde06"`             //	고시일자_취급금지물질
	Ntfcde16             string        `xml:"ntfcde16"`             //	고시일자_유독물
	Ntfcde17             string        `xml:"ntfcde17"`             //	고시일자_관찰물질
	Ntfcde18             string        `xml:"ntfcde18"`             //	고시일자_취급제한물질
	Ntfcde19             string        `xml:"ntfcde19"`             //	고시일자_취급금지물질
	Ntfcinfo01           string        `xml:"ntfcinfo01"`           //	고시정보_기존화학물질
	Ntfcinfo03           string        `xml:"ntfcinfo03"`           //	고시정보_유독물
	Ntfcinfo04           string        `xml:"ntfcinfo04"`           //	고시정보_관찰물질
	Ntfcinfo05           string        `xml:"ntfcinfo05"`           //	고시정보_취급제한물질
	Ntfcinfo06           string        `xml:"ntfcinfo06"`           //	고시정보_취급금지물질
	Ntfcinfo16           string        `xml:"ntfcinfo16"`           //	고시정보_유독물
	Ntfcinfo17           string        `xml:"ntfcinfo17"`           //	고시정보_관찰물질
	Ntfcinfo18           string        `xml:"ntfcinfo18"`           //	고시정보_취급제한물질
	Ntfcinfo19           string        `xml:"ntfcinfo19"`           //	고시정보_취급금지물질
	Ntfcinfo20           string        `xml:"ntfcinfo20"`           //	등록대상기존화학물질 번호
	Scdntprovsmttrat     string        `xml:"acdntprovsmttrat"`     //	물질번호_취급금지물질
	Lqttprdctnchmclsat   string        `xml:"lqttprdctnchmclsat"`   //	대량생산화학물질여부
	Remnorgniccntmnntat  string        `xml:"remnorgniccntmnntat"`  //	잔류성유기오염물질여부
	Rotterdamagremmttrat string        `xml:"rotterdamagremmttrat"` //	로테르담협약물질
}

const (
	DB_HOST = "tcp(192.168.0.202:3306)"
	DB_NAME = "easysafedb"
	DB_USER = /*"root"*/ "con"
	DB_PASS = /*""*/ "concon"
)

func main() {

	/*

	 */
	dsn := DB_USER + ":" + DB_PASS + "@" + DB_HOST + "/" + DB_NAME + "?charset=utf8"

	db, err := sql.Open("mysql", dsn)
	check(err)
	defer db.Close()

	err = db.Ping()
	check(err)

	stmtIns, err := db.Prepare("Insert into tbl_gonggong_chemlist( casNo, oriChem, KorName, EngName, oriChemNo, nontoxicNo, toxicNo, needWatchNo, restrictedHandleNo, noHandleNo, noHandle08, noHandle10, noHandle11,noHandle12,	noHandle14,toxic16,needWatch17,restrictedHandle18,noHandle19,Con_toxic03,	Con_needWatch04, Con_restrictedHandle05, Con_noHandle06, Con_toxic16, Con_needWatch17, Con_restrictedHandle18, Con_noHandle19, Reason_toxic03, Reason_needWatch04, Reason_restrictedHandle05, Reason_noHandle06, Reason_toxic16 , Reason_needWatch17, Reason_restrictedHandle18,Reason_noHandle, Date_oriChem,Date_toxic,Date_needWatch, Date_restrictedHandle05, Date_noHandle06,Date_toxic16, Date_needWatch17, Date_restrictedHandle18, Date_noHandle19, infoOriChem01,infoToxic03, infoNeedWatch04, infoRestrictedHandle05, infoNoHandle06, infoToxic16, infoNeedWatch17, infoRestrictedHandle18, infoNoHandle19, regiChemNo20,noHandleMaterialNo, isMassProduction, hasOrgContamination, rotterdam)" +
	"values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)")
	/*stmtIns, err := db.Prepare("Insert into tbl_gonggong_chemlist values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")*/

	check(err)

	defer stmtIns.Close()


	keyword := []string{"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"}

	for _, key := range keyword{

		url := baseUrl + search_nm + key +"&"+ numOfRows + "1" + "&" + pageNo + "1" + "&" + serviceKey

		res, err := http.Get(url)

		check(err)
		defer res.Body.Close()

		body, err := ioutil.ReadAll(res.Body)
		if err != nil {
			panic(err.Error())
		}

		//body, err := ioutil.ReadAll(res.Body)

		//fmt.Println(string(body))

		var q Query

		err = xml.Unmarshal(body, &q)
		check(err)

		fmt.Println("Init Search key : " + key)
		fmt.Println("Init ResultCode : " + q.Header.ResultCode)
		fmt.Println("Init ResultMsg : " + q.Header.ResultMsg)
		fmt.Println("Init NumOfRows : " + q.Body.NumOfRows)
		fmt.Println("Init PageNo : " + q.Body.PageNo)
		fmt.Println("Init TotalCount : " + q.Body.TotalCount)

		//total, _ := strconv.Atoi(q.Body.TotalCount)
		//rownum := 5000;

		/*
		if total >= rownum {
			for i := 0; i <= total/rownum; i++ {
				url = baseUrl + search_nm + key +"&"+ numOfRows + "5000" + "&" + pageNo + strconv.Itoa(i+1) + "&" + serviceKey

				res, err := http.Get(url)

				check(err)
				defer res.Body.Close()

				body, err := ioutil.ReadAll(res.Body)
				if err != nil {
					panic(err.Error())
				}

				err = xml.Unmarshal(body, &q)
				check(err)

				fmt.Println(strconv.Itoa(i) + " : Search key : " + key)
				fmt.Println(strconv.Itoa(i) + " : ResultCode : " + q.Header.ResultCode)
				fmt.Println(strconv.Itoa(i) + " : ResultMsg : " + q.Header.ResultMsg)
				fmt.Println(strconv.Itoa(i) + " : NumOfRows : " + q.Body.NumOfRows)
				fmt.Println(strconv.Itoa(i) + " : PageNo : " + q.Body.PageNo)
				fmt.Println(strconv.Itoa(i) + " : TotalCount : " + q.Body.TotalCount)

				for j:= range q.Body.Items.Item{
					korName := q.Body.Items.Item[j].Chmclskoreannm + q.Body.Items.Item[j].Chmclskoreannm2
					EngName := q.Body.Items.Item[j].Chmclsengnm + q.Body.Items.Item[j].Chmclsengnm2

					stmtIns.Exec(
						q.Body.Items.Item[j].CasNo,
						q.Body.Items.Item[j].Keno,
						korName,
						EngName,
						q.Body.Items.Item[j].Mttrno01,
						q.Body.Items.Item[j].Mttrno02,
						q.Body.Items.Item[j].Mttrno03,
						q.Body.Items.Item[j].Mttrno04,
						q.Body.Items.Item[j].Mttrno05,
						q.Body.Items.Item[j].Mttrno06,
						q.Body.Items.Item[j].Mttrno08,
						q.Body.Items.Item[j].Mttrno10,
						q.Body.Items.Item[j].Mttrno11,
						q.Body.Items.Item[j].Mttrno12,
						q.Body.Items.Item[j].Mttrno14,
						q.Body.Items.Item[j].Mttrno16,
						q.Body.Items.Item[j].Mttrno17,
						q.Body.Items.Item[j].Mttrno18,
						q.Body.Items.Item[j].Mttrno19,
						q.Body.Items.Item[j].Continfo03,
						q.Body.Items.Item[j].Continfo04,
						q.Body.Items.Item[j].Continfo05,
						q.Body.Items.Item[j].Continfo06,
						q.Body.Items.Item[j].Continfo16,
						q.Body.Items.Item[j].Continfo17,
						q.Body.Items.Item[j].Continfo18,
						q.Body.Items.Item[j].Continfo19,
						q.Body.Items.Item[j].Lmttinfo03,
						q.Body.Items.Item[j].Lmttinfo04,
						q.Body.Items.Item[j].Lmttinfo05,
						q.Body.Items.Item[j].Lmttinfo06,
						q.Body.Items.Item[j].Lmttinfo16,
						q.Body.Items.Item[j].Lmttinfo17,
						q.Body.Items.Item[j].Lmttinfo18,
						q.Body.Items.Item[j].Lmttinfo19,
						q.Body.Items.Item[j].Ntfcde01,
						q.Body.Items.Item[j].Ntfcde03,
						q.Body.Items.Item[j].Ntfcde04,
						q.Body.Items.Item[j].Ntfcde05,
						q.Body.Items.Item[j].Ntfcde06,
						q.Body.Items.Item[j].Ntfcde16,
						q.Body.Items.Item[j].Ntfcde17,
						q.Body.Items.Item[j].Ntfcde18,
						q.Body.Items.Item[j].Ntfcde19,
						q.Body.Items.Item[j].Ntfcinfo01,
						q.Body.Items.Item[j].Ntfcinfo03,
						q.Body.Items.Item[j].Ntfcinfo04,
						q.Body.Items.Item[j].Ntfcinfo05,
						q.Body.Items.Item[j].Ntfcinfo06,
						q.Body.Items.Item[j].Ntfcinfo16,
						q.Body.Items.Item[j].Ntfcinfo17,
						q.Body.Items.Item[j].Ntfcinfo18,
						q.Body.Items.Item[j].Ntfcinfo19,
						q.Body.Items.Item[j].Ntfcinfo20,
						q.Body.Items.Item[j].Scdntprovsmttrat,
						q.Body.Items.Item[j].Lqttprdctnchmclsat,
						q.Body.Items.Item[j].Remnorgniccntmnntat,
						q.Body.Items.Item[j].Rotterdamagremmttrat)

				}


				}


		}
		*/

	}







}
