package services

import (
	"fmt"
	"lms_be/internal/models"
	"lms_be/internal/ports"
	dateformat "lms_be/pkg/date_format"
)

type educationServices struct {
	repo ports.EducationRepositories
}

func NewEducationService(repo ports.EducationRepositories) *educationServices {
	return &educationServices{
		repo: repo,
	}
}

func (e *educationServices) GetAll() (*models.GetAllEducationResp, *models.ServiceError) {
	resp, err := e.repo.GetAll()
	if len(resp) <= 0 || err != nil {
		fmt.Println(err)
	}

	educations := []models.Education{}
	for _, edu := range resp {
		educations = append(
			educations,
			models.Education{
				Eid:         edu.Eid,
				THName:      edu.THName,
				ENName:      edu.ENName,
				Details:     edu.Details,
				CreatedDate: edu.CreatedDate.Format(dateformat.DDMMYYYYHHmmss),
				UpdatedDate: edu.UpdatedDate.Format(dateformat.DDMMYYYYHHmmss),
			})
	}

	return &models.GetAllEducationResp{
		Education: educations,
	}, nil
}
