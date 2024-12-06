package models

import (
	"time"

	"gorm.io/gorm/schema"
)

type Education struct {
	Eid         string  `json:"eid"`
	THName      string  `json:"th_name"`
	ENName      string  `json:"en_name"`
	Details     *string `json:"details"`
	CreatedDate string  `json:"created_date"`
	UpdatedDate string  `json:"updated_date"`
}

type EducationRepo struct {
	Eid         string    `gorm:"eid"`
	THName      string    `gorm:"th_name"`
	ENName      string    `gorm:"en_name"`
	Details     *string   `gorm:"details"`
	CreatedDate time.Time `gorm:"created_date"`
	UpdatedDate time.Time `gorm:"updated_date"`
}

type GetAllEducationResp struct {
	Education []Education
}

func (e EducationRepo) TableName(namer schema.Namer) string {
	tbName := "education_list"
	if namer == nil {
		return tbName
	}
	return namer.TableName(tbName)
}
