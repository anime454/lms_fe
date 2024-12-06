package ports

import "lms_be/internal/models"

type LoanService interface {
	New(models.NewLoanReq) (*models.NewLoanResp, *models.ServiceError)
	Get(lid string) (*models.LoanData, *models.ServiceError)
	GetDashboardDetails(req models.GetLoanDashboardDetailReq) (*models.GetLoanDashboardDetailResp, *models.ServiceError)
	Update(req models.UpdateLoanReq) (*models.UpdateLoanResp, *models.ServiceError)
	Delete(lid string) (string, *models.ServiceError)
}

type LoanRepositories interface {
	Create(models.LoanRepo) (int64, error)
	Get(lid string) (models.LoanRepo, error)
	GetDashboardDetails(limit, offset int64) ([]models.GetLoanDashboardDetailRepo, error)
	Count() (int64, error)
	Update(models.LoanRepo) (int64, error)
	Delete(lid string) (int64, error)
}
