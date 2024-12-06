package handlers

import (
	"lms_be/internal/models"
	"lms_be/internal/ports"

	"github.com/labstack/echo"
)

type customerTitleHandler struct {
	serv ports.CustomerTitleServices
}

func NewCustomerTitleHandler(serv ports.CustomerTitleServices) *customerTitleHandler {
	return &customerTitleHandler{
		serv: serv,
	}
}

func (ct *customerTitleHandler) GetAll(e echo.Context) error {
	serviceResp, serviceErr := ct.serv.GetAll()
	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}
	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}
