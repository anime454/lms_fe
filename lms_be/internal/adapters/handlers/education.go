package handlers

import (
	"lms_be/internal/models"
	"lms_be/internal/ports"

	"github.com/labstack/echo"
)

type educationHandler struct {
	serv ports.EducationServices
}

func NewEducationHandler(serv ports.EducationServices) *educationHandler {
	return &educationHandler{
		serv: serv,
	}
}

func (edu *educationHandler) GetAll(e echo.Context) error {
	serviceResp, serviceErr := edu.serv.GetAll()
	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}
	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}
