package models

import (
	"gorm.io/gorm/schema"
)

type LoanData struct {
	Lid             string          `json:"lid"`
	Name            string          `json:"name"`
	Description     string          `json:"description"`
	Criteria        []Criteria      `json:"criteria"`
	Characteristics Characteristics `json:"characteristics"`
}

type LoanRepo struct {
	Lid                    string  `gorm:"lid"`
	Name                   string  `gorm:"name"`
	Description            string  `gorm:"description"`
	Criteria               string  `gorm:"criteria"`
	CharacteristicType     string  `gorm:"characteristic_type"`
	AmortizationDuration   int64   `gorm:"amortization_duration"`
	AmortizationPeriodType string  `gorm:"amortization_period_type"`
	InterestRateType       string  `gorm:"interest_rate_type"`
	InterestRateValue      float64 `gorm:"interest_rate_value"`
	MaximumLoanAmount      int64   `gorm:"maximum_loan_amount"`
}

func (l LoanRepo) TableName(namer schema.Namer) string {
	tbName := "loans"
	if namer == nil {
		return tbName
	}
	return namer.TableName(tbName)
}

type Criteria struct {
	RiskProfile          string  `json:"risk_profile"`
	NatureOfAssets       string  `json:"nature_ofAssets"`
	MinimumValueOfAssets float64 `json:"minimum_value_of_assets"`
	CreditScore          int     `json:"credit_score"`
}

type CriteriaRepo struct {
	Cid           string `gorm:"cid"`
	RiskProfile   string `gorm:"risk_profile"`
	AssetNature   string `gorm:"asset_nature"`
	MinAssetValue int64  `gorm:"min_asset_value"`
	CreditScore   int64  `gorm:"credit_score"`
}

func (c CriteriaRepo) TableName(namer schema.Namer) string {
	tbName := "loan_criteria"
	if namer == nil {
		return tbName
	}
	return namer.TableName(tbName)
}

type Characteristics struct {
	Type               string             `json:"type"` // SecuredOrUnsecured
	AmortizationPeriod AmortizationPeriod `json:"amortization_period"`
	InterestRate       InterestRate       `json:"interest_rate"`
	MaxValue           int64              `json:"max_value"`
}

type AmortizationPeriod struct {
	Duration int64  `json:"duration"`
	Type     string `json:"type"`
}

type InterestRate struct {
	Type  string  `json:"type"`
	Value float64 `json:"value"`
}

type NewLoanReq struct {
	Name            string          `json:"name"`
	Description     string          `json:"description"`
	Criteria        []Criteria      `json:"criteria"`
	Characteristics Characteristics `json:"characteristics"`
}

type NewLoanResp struct {
	Lid string `json:"lid"`
}

type UpdateLoanReq struct {
	Lid string `json:"lid"`
	NewLoanReq
}

type UpdateLoanResp struct {
	Lid string `json:"lid"`
}

type GetLoanDashboardDetailReq struct {
	Limit  uint64 `json:"limit"`
	Offset uint64 `json:"offset"`
}

type GetLoanDashboardDetailData struct {
	Lid               string `json:"lid"`
	Name              string `json:"name"`
	RiskProfile       string `json:"risk_profile"`
	InterestRateType  string `json:"interest_rate_type"`
	InterestRateValue string `json:"interest_rate_value"`
	MaximumLoanAmount string `json:"maximum_loan_amount"`
}

type GetLoanDashboardDetailResp struct {
	Loans []GetLoanDashboardDetailData `json:"loans"`
	Total int64                        `json:"total"`
}

type GetLoanDashboardDetailRepo struct {
	Lid               string `gorm:"lid"`
	Name              string `gorm:"name"`
	Criteria          string `gorm:"criteria"`
	InterestRateType  string `gorm:"interest_rate_type"`
	InterestRateValue string `gorm:"interest_rate_value"`
	MaximumLoanAmount string `gorm:"maximum_loan_amount"`
}

func (l GetLoanDashboardDetailRepo) TableName(namer schema.Namer) string {
	tbName := "loans"
	if namer == nil {
		return tbName
	}
	return namer.TableName(tbName)
}
