package models

import (
	"time"

	"gorm.io/gorm/schema"
)

type CustomerTitle struct {
	Tid         string `json:"tid"`
	THName      string `json:"th_name"`
	ENName      string `json:"en_name"`
	CreatedDate string `json:"created_date"`
	UpdatedDate string `json:"updated_date"`
}

type CustomerTitleRepo struct {
	Tid         string    `gorm:"tid"`
	THName      string    `gorm:"th_name"`
	ENName      string    `gorm:"en_name"`
	CreatedDate time.Time `gorm:"created_date"`
	UpdatedDate time.Time `gorm:"updated_date"`
}

type GetAllCustomerTitleResp struct {
	Title []CustomerTitle
}

func (ct CustomerTitleRepo) TableName(namer schema.Namer) string {
	tbName := "customer_title_list"
	if namer == nil {
		return tbName
	}
	return namer.TableName(tbName)
}
