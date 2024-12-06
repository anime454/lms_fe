package handlers

import (
	"fmt"
	"lms_be/internal/errors"
	"lms_be/internal/models"
	"lms_be/internal/ports"

	"github.com/labstack/echo"
)

type customerHandler struct {
	serv ports.CustomerServices
}

func NewCustomerHandler(serv ports.CustomerServices) *customerHandler {
	return &customerHandler{
		serv: serv,
	}
}

func (c *customerHandler) New(e echo.Context) error {
	req := models.NewCustomerReq{}

	err := e.Bind(&req)

	if err != nil {
		fmt.Println(err)
		return e.JSON(echo.ErrBadRequest.Code, errors.ErrBadRequest)
	}

	serviceResp, serviceErr := c.serv.New(req)
	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}

	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}

func (c *customerHandler) Edit(e echo.Context) error {
	req := models.EditCustomerReq{}

	err := e.Bind(&req)

	if err != nil {
		fmt.Println(err)
		return e.JSON(echo.ErrBadRequest.Code, errors.ErrBadRequest)
	}

	serviceResp, serviceErr := c.serv.Edit(req)
	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}

	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}

func (c *customerHandler) View(e echo.Context) error {
	req := models.ViewCustomerReq{}

	err := e.Bind(&req)

	if err != nil {
		fmt.Println(err)
		return e.JSON(echo.ErrBadRequest.Code, errors.ErrBadRequest)
	}

	serviceResp, serviceErr := c.serv.View(req)
	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}

	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}

func (c *customerHandler) Remove(e echo.Context) error {
	req := models.RemoveCustomerReq{}

	err := e.Bind(&req)

	if err != nil {
		fmt.Println(err)
		return e.JSON(echo.ErrBadRequest.Code, errors.ErrBadRequest)
	}

	serviceResp, serviceErr := c.serv.Remove(req)
	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}

	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}

func (c *customerHandler) GetAll(e echo.Context) error {
	req := models.GetAllCustomerReq{}

	err := e.Bind(&req)

	if err != nil {
		fmt.Println(err)
		return e.JSON(echo.ErrBadRequest.Code, errors.ErrBadRequest)
	}

	serviceResp, serviceErr := c.serv.GetAll(req)
	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}

	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}
