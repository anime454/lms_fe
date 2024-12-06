package handlers

import (
	"fmt"
	"lms_be/internal/errors"
	"lms_be/internal/models"
	"lms_be/internal/ports"
	"strconv"

	"github.com/labstack/echo"
)

type packageHandler struct {
	serv ports.PaymentServices
}

func NewPaymentHandler(serv ports.PaymentServices) *packageHandler {
	return &packageHandler{
		serv: serv,
	}
}

func (p *packageHandler) New(e echo.Context) error {
	req := models.NewPaymentReq{}

	err := e.Bind(&req)

	if err != nil {
		fmt.Println(err)
		return e.JSON(echo.ErrBadRequest.Code, errors.ErrBadRequest)
	}

	serviceResp, serviceErr := p.serv.New(req)

	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}

	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}

func (p *packageHandler) Get(e echo.Context) error {

	pid := e.Param("pid")

	if pid == "" {
		return e.JSON(echo.ErrBadRequest.Code, errors.ErrBadRequest)
	}

	serviceResp, serviceErr := p.serv.Get(pid)

	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}

	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}

func (p *packageHandler) Update(e echo.Context) error {
	req := models.UpdatePaymentReq{}

	err := e.Bind(&req)

	if err != nil {
		fmt.Println(err)
		return e.JSON(echo.ErrBadRequest.Code, errors.ErrBadRequest)
	}

	serviceResp, serviceErr := p.serv.Update(req)

	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}

	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}

func (p *packageHandler) GetDashboardDetails(e echo.Context) error {
	limit, err := strconv.ParseInt(e.QueryParam("limit"), 10, 64)
	if err != nil {
		fmt.Println(err)
	}

	offset, err := strconv.ParseInt(e.QueryParam("offset"), 10, 64)
	if err != nil {
		fmt.Println(err)
	}

	serviceResp, serviceErr := p.serv.GetDashboardDetails(limit, offset)

	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}

	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}

func (p *packageHandler) Delete(e echo.Context) error {

	pid := e.Param("pid")

	if pid == "" {
		return e.JSON(echo.ErrBadRequest.Code, errors.ErrBadRequest)
	}

	serviceResp, serviceErr := p.serv.Delete(pid)

	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}

	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}
