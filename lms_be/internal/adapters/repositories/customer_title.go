package repositories

import (
	"lms_be/internal/models"

	"gorm.io/gorm"
)

type customerTitleRepositories struct {
	db *gorm.DB
}

func NewCustomerTitleRepositories(db *gorm.DB) *customerTitleRepositories {
	return &customerTitleRepositories{
		db: db,
	}
}

func (ct *customerTitleRepositories) GetAll() ([]models.CustomerTitleRepo, error) {
	customerTitle := []models.CustomerTitleRepo{}
	err := ct.db.Find(&customerTitle).Error
	return customerTitle, err
}

func (ct *customerTitleRepositories) GetById(tid string) (models.CustomerTitleRepo, error) {
	customerTitle := models.CustomerTitleRepo{}
	err := ct.db.Where("tid = ?", tid).Find(&customerTitle).Error
	return customerTitle, err
}
