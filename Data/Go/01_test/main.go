package main

import (
	"fmt"
	"io/ioutil"
	"encoding/json"
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

func main() {

	dat, err := ioutil.ReadFile("C:/Users/human/Downloads/FoodAdditives/additives.rdf.additive.json")
	check(err)

	var elements Items
	json.Unmarshal(dat, &elements)


	for i := range elements.Item {
		fmt.Printf("%+v", elements.Item[i].Name)
		fmt.Printf("      %+v \n", elements.Item[i].Id)
	}

}