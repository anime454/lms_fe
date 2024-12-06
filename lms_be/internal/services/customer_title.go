package services

import (
	"fmt"
	"lms_be/internal/models"
	"lms_be/internal/ports"
	dateformat "lms_be/pkg/date_format"
)

type customerTitleServices struct {
	repo ports.CustomerTitleRepositories
}

func NewCustomerTitleService(repo ports.CustomerTitleRepositories) *customerTitleServices {
	return &customerTitleServices{
		repo: repo,
	}
}

func (ct *customerTitleServices) GetAll() (*models.GetAllCustomerTitleResp, *models.ServiceError) {
	resp, err := ct.repo.GetAll()
	if len(resp) <= 0 || err != nil {
		fmt.Println(err)
	}

	customerTitles := []models.CustomerTitle{}
	for _, tit := range resp {
		customerTitles = append(
			customerTitles,
			models.CustomerTitle{
				Tid:         tit.Tid,
				THName:      tit.THName,
				ENName:      tit.ENName,
				CreatedDate: tit.CreatedDate.Format(dateformat.DDMMYYYYHHmmss),
				UpdatedDate: tit.UpdatedDate.Format(dateformat.DDMMYYYYHHmmss),
			})
	}

	return &models.GetAllCustomerTitleResp{
		Title: customerTitles,
	}, nil
}
