package models

import (
	"time"

	"gorm.io/gorm/schema"
)

type Employment struct {
	Emid        string  `json:"emid"`
	THName      string  `json:"th_name"`
	ENName      string  `json:"en_name"`
	Details     *string `json:"details"`
	CreatedDate string  `json:"created_date"`
	UpdatedDate string  `json:"updated_date"`
}

type EmploymentRepo struct {
	Emid        string    `gorm:"emid"`
	THName      string    `gorm:"th_name"`
	ENName      string    `gorm:"en_name"`
	Details     *string   `gorm:"details"`
	CreatedDate time.Time `gorm:"created_date"`
	UpdatedDate time.Time `gorm:"updated_date"`
}

type GetAllEmploymentResp struct {
	Employment []Employment
}

func (em EmploymentRepo) TableName(namer schema.Namer) string {
	tbName := "employment_list"
	if namer == nil {
		return tbName
	}
	return namer.TableName(tbName)
}
