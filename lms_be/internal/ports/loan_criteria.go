package ports

import "lms_be/internal/models"

type LoanCriteriaRepositories interface {
	Create(req models.CriteriaRepo) (int64, error)
	Get(cid string) (models.CriteriaRepo, error)
}
