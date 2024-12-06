package ports

import "lms_be/internal/models"

type PaymentServices interface {
	New(models.NewPaymentReq) (*models.NewPaymentResp, *models.ServiceError)
	Get(pid string) (*models.PaymentData, *models.ServiceError)
	GetDashboardDetails(limit, offset int64) (*models.GetPaymentDashboardDetailResp, *models.ServiceError)
	Update(req models.UpdatePaymentReq) (*models.UpdatePaymentResp, *models.ServiceError)
	Delete(pid string) (string, *models.ServiceError)
}

type PaymentRepositories interface {
	Create(models.PaymentRepo) (int64, error)
	Get(pid string) (*models.PaymentRepo, error)
	GetDashboardDetails(limit, offset int64) ([]models.PaymentRepo, error)
	Update(models.PaymentRepo) (int64, error)
	Count() (int64, error)
	Delete(pid string) (int64, error)
}
