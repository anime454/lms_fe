package handlers

import (
	"lms_be/internal/models"
	"lms_be/internal/ports"

	"github.com/labstack/echo"
)

type employmentHandler struct {
	serv ports.EmploymentServices
}

func NewEmploymentHandler(serv ports.EmploymentServices) *employmentHandler {
	return &employmentHandler{
		serv: serv,
	}
}

func (em *employmentHandler) GetAll(e echo.Context) error {
	serviceResp, serviceErr := em.serv.GetAll()
	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}
	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}
