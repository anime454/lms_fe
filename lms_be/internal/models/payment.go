package models

import (
	"time"

	"gorm.io/gorm/schema"
)

type PaymentData struct {
	Pid          string    `json:"pid"`
	Cid          string    `json:"cid"`
	Lid          string    `json:"lid"`
	DueDate      time.Time `json:"due_date"`
	Status       string    `json:"status"`
	Amount       int64     `json:"amount"`
	InterestRate int64     `json:"interest_rate"`
}

type NewPaymentReq struct {
	Cid          string `json:"cid"`
	Lid          string `json:"lid"`
	DueDate      string `json:"due_date"`
	Status       string `json:"status"`
	Amount       int64  `json:"amount"`
	InterestRate int64  `json:"interest_rate"`
}

type PaymentRepo struct {
	Pid          string    `gorm:"pid"`
	Cid          string    `gorm:"cid"`
	Lid          string    `gorm:"lid"`
	DueDate      time.Time `gorm:"due_date"`
	Status       string    `gorm:"status"`
	Amount       int64     `gorm:"amount"`
	InterestRate int64     `gorm:"interest_rate"`
}

type GetPaymentDashboardDetailResp struct {
	Payment []PaymentData `json:"payment"`
	Total   int64         `json:"total"`
}

func (p PaymentRepo) TableName(namer schema.Namer) string {
	tbName := "payments"
	if namer == nil {
		return tbName
	}
	return namer.TableName(tbName)
}

type NewPaymentResp struct {
	Pid string `json:"pid"`
}

type UpdatePaymentReq struct {
	Pid string `json:"pid"`
	NewPaymentReq
}

type UpdatePaymentResp struct {
	Pid string `json:"pid"`
}
