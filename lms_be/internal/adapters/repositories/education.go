package repositories

import (
	"lms_be/internal/models"

	"gorm.io/gorm"
)

type educationRepositories struct {
	db *gorm.DB
}

func NewEducationRepositories(db *gorm.DB) *educationRepositories {
	return &educationRepositories{
		db: db,
	}
}

func (e *educationRepositories) GetAll() ([]models.EducationRepo, error) {
	educations := []models.EducationRepo{}
	err := e.db.Find(&educations).Error
	return educations, err
}
