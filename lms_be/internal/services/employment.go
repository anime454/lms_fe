package services

import (
	"fmt"
	"lms_be/internal/models"
	"lms_be/internal/ports"
	dateformat "lms_be/pkg/date_format"
)

type employmentService struct {
	repo ports.EmploymentRepositories
}

func NewEmploymentService(repo ports.EmploymentRepositories) *employmentService {
	return &employmentService{
		repo: repo,
	}
}

func (em *employmentService) GetAll() (*models.GetAllEmploymentResp, *models.ServiceError) {
	resp, err := em.repo.GetAll()
	if len(resp) <= 0 || err != nil {
		fmt.Println(err)
	}

	employments := []models.Employment{}
	for _, emp := range resp {
		employments = append(
			employments,
			models.Employment{
				Emid:        emp.Emid,
				THName:      emp.THName,
				ENName:      emp.ENName,
				Details:     emp.Details,
				CreatedDate: emp.CreatedDate.Format(dateformat.DDMMYYYYHHmmss),
				UpdatedDate: emp.UpdatedDate.Format(dateformat.DDMMYYYYHHmmss),
			})
	}

	return &models.GetAllEmploymentResp{
		Employment: employments,
	}, nil
}
