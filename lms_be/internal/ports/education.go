package ports

import "lms_be/internal/models"

type EducationServices interface {
	GetAll() (*models.GetAllEducationResp, *models.ServiceError)
}

type EducationRepositories interface {
	GetAll() ([]models.EducationRepo, error)
}
