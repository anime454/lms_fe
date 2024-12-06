package ports

import "lms_be/internal/models"

type EmploymentServices interface {
	GetAll() (*models.GetAllEmploymentResp, *models.ServiceError)
}

type EmploymentRepositories interface {
	GetAll() ([]models.EmploymentRepo, error)
}
