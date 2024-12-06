package repositories

import (
	"lms_be/internal/models"

	"gorm.io/gorm"
)

type employmentRepositories struct {
	db *gorm.DB
}

func NewEmploymentRepositories(db *gorm.DB) *employmentRepositories {
	return &employmentRepositories{
		db: db,
	}
}

func (em *employmentRepositories) GetAll() ([]models.EmploymentRepo, error) {
	employments := []models.EmploymentRepo{}
	err := em.db.Find(&employments).Error
	return employments, err
}
