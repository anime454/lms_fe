package ports

import "lms_be/internal/models"

type CustomerTitleServices interface {
	GetAll() (*models.GetAllCustomerTitleResp, *models.ServiceError)
}

type CustomerTitleRepositories interface {
	GetAll() ([]models.CustomerTitleRepo, error)
	GetById(tid string) (models.CustomerTitleRepo, error)
}
