package ports

import (
	"lms_be/internal/models"
)

type CustomerServices interface {
	New(req models.NewCustomerReq) (*models.NewCustomerResp, *models.ServiceError)
	GetAll(req models.GetAllCustomerReq) (*models.GetAllCustomerResp, *models.ServiceError)
	View(req models.ViewCustomerReq) (*models.ViewCustomerResp, *models.ServiceError)
	Edit(req models.EditCustomerReq) (*models.EditCustomerResp, *models.ServiceError)
	Remove(req models.RemoveCustomerReq) (*models.RemoveCustomerResp, *models.ServiceError)
}

type CustomerRepositories interface {
	New(cust models.CustomerRepo) (int64, error)
	Find(limit uint64, offSet uint64) ([]models.GetAllCustomerRepo, error)
	Count() (int64, error)
	FindById(cid string) (*models.CustomerRepo, error)
	FindWithAllById(cid string) (*models.CustomerRepoWithAll, error)
	Update(cust models.CustomerRepo) (int64, error)
	Remove(cust models.CustomerRepo) (int64, error)
}
