package models

import (
	"time"

	"gorm.io/gorm/schema"
)

type Customer struct {
	Title       CustomerTitle `json:"title"`
	THName      string        `json:"th_name" validate:"required"`
	ENName      string        `json:"en_name"`
	THLastname  string        `json:"th_lastname" validate:"required"`
	ENLastname  string        `json:"en_lastname"`
	IdCard      string        `json:"ic_card" validate:"required"`
	PassportNo  string        `json:"passport_no"`
	Address     Address       `json:"address" validate:"required"`
	MobileNo    string        `json:"mobile_no" validate:"required"`
	Email       string        `json:"email"`
	Education   Education     `json:"education"`
	Employment  Employment    `json:"employment"`
	Salary      float64       `json:"salary"`
	Status      string        `json:"status"`
	OtherIncome float64       `json:"other_income"`
}

type NewCustomerReq struct {
	TitleId      string  `json:"title_id" validate:"required"`
	THName       string  `json:"th_name" validate:"required"`
	ENName       string  `json:"en_name"`
	THLastname   string  `json:"th_lastname" validate:"required"`
	ENLastname   string  `json:"en_lastname"`
	IdCard       string  `json:"ic_card" validate:"required"`
	PassportNo   string  `json:"passport_no"`
	Address      Address `json:"address" validate:"required"`
	MobileNo     string  `json:"mobile_no" validate:"required"`
	Email        string  `json:"email"`
	EducationId  string  `json:"education_id" validate:"required"`
	EmploymentId string  `json:"employment_id" validate:"required"`
	Salary       float64 `json:"salary"`
	Status       string  `json:"status"`
	OtherIncome  float64 `json:"other_income"`
}

type NewCustomerResp struct {
	Cid string `json:"cid"`
}

type GetAllCustomerReq struct {
	Limit  uint64 `json:"limit"`
	Offset uint64 `json:"offset"`
}

type GetAllCustomerResp struct {
	Customers []GetAllCustomerDetailResp `json:"customers"`
	Total     int64                      `json:"total"`
}

type GetAllCustomerDetailResp struct {
	Cid         string `json:"cid"`
	THName      string `json:"th_name"`
	THLastname  string `json:"th_lastname"`
	IdCard      string `json:"id_card"`
	PassportNo  string `json:"passport_no"`
	MobileNo    string `json:"mobile_no"`
	Status      string `json:"status"`
	CreatedDate string `json:"created_date"`
}

type GetAllCustomerRepo struct {
	Cid         string    `gorm:"cid"`
	TitleId     string    `gorm:"title_id"`
	THName      string    `gorm:"th_name"`
	ENName      string    `gorm:"en_name"`
	THLastname  string    `gorm:"th_lastname"`
	ENLastname  string    `gorm:"en_lastname"`
	IdCard      string    `gorm:"id_card"`
	PassportNo  string    `gorm:"passport_no"`
	MobileNo    string    `gorm:"mobile_no"`
	Status      string    `gorm:"status"`
	CreatedDate time.Time `gorm:"create_date"`
}

func (c GetAllCustomerRepo) TableName(namer schema.Namer) string {
	tbName := "customers"
	if namer == nil {
		return tbName
	}
	return namer.TableName(tbName)
}

type ViewCustomerReq struct {
	Cid string `json:"cid" validate:"required"`
}

type ViewCustomerResp struct {
	Cid string `json:"cid"`
	Customer
}

type EditCustomerReq struct {
	Cid string `json:"cid" validate:"required"`
	NewCustomerReq
}

type EditCustomerResp struct {
	Cid string `json:"cid"`
}

type RemoveCustomerReq struct {
	Cid string `json:"cid" validate:"required"`
}

type RemoveCustomerResp struct {
	Cid string `json:"cid"`
}

type CustomerRepo struct {
	Cid          string   `gorm:"cid"`
	TitleId      string   `json:"title_id" validate:"required"`
	THName       string   `gorm:"th_name"`
	ENName       *string  `gorm:"en_name"`
	THLastname   string   `gorm:"th_lastname"`
	ENLastname   *string  `gorm:"en_lastname"`
	IdCard       string   `gorm:"ic_card"`
	PassportNo   *string  `gorm:"passport_no"`
	MobileNo     string   `gorm:"mobile_no"`
	Email        *string  `gorm:"email"`
	EducationId  string   `gorm:"education_id"`
	EmploymentId string   `gorm:"employment_id"`
	Salary       *float64 `gorm:"salary"`
	Status       string   `gorm:"status"`
	OtherIncome  *float64 `gorm:"other_income"`
}

func (c CustomerRepo) TableName(namer schema.Namer) string {
	tbName := "customers"
	if namer == nil {
		return tbName
	}
	return namer.TableName(tbName)
}

type CustomerRepoWithAll struct {
	CustomerRepo
	CustomerTitleRepo
	AddressRepo
	EducationRepo
	EmploymentRepo
}
