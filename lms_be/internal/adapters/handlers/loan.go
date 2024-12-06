package handlers

import (
	"fmt"
	"lms_be/internal/errors"
	"lms_be/internal/models"
	"lms_be/internal/ports"

	"github.com/labstack/echo"
)

type loanHandler struct {
	serv ports.LoanService
}

func NewLoanHandler(serv ports.LoanService) *loanHandler {
	return &loanHandler{
		serv: serv,
	}
}

func (l *loanHandler) New(e echo.Context) error {
	req := models.NewLoanReq{}

	err := e.Bind(&req)

	if err != nil {
		fmt.Println(err)
		return e.JSON(echo.ErrBadRequest.Code, errors.ErrBadRequest)
	}

	serviceResp, serviceErr := l.serv.New(req)

	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}

	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}

func (l *loanHandler) Get(e echo.Context) error {

	cid := e.Param("cid")

	if cid == "" {
		return e.JSON(echo.ErrBadRequest.Code, errors.ErrBadRequest)
	}

	serviceResp, serviceErr := l.serv.Get(cid)

	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}

	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}

func (l *loanHandler) GetDashboardDetails(e echo.Context) error {
	req := models.GetLoanDashboardDetailReq{}

	err := e.Bind(&req)

	if err != nil {
		fmt.Println(err)
		return e.JSON(echo.ErrBadRequest.Code, errors.ErrBadRequest)
	}

	serviceResp, serviceErr := l.serv.GetDashboardDetails(req)

	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}

	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}

func (l *loanHandler) Update(e echo.Context) error {
	req := models.UpdateLoanReq{}

	err := e.Bind(&req)

	if err != nil {
		fmt.Println(err)
		return e.JSON(echo.ErrBadRequest.Code, errors.ErrBadRequest)
	}

	serviceResp, serviceErr := l.serv.Update(req)

	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}

	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}

func (l *loanHandler) Delete(e echo.Context) error {

	cid := e.Param("cid")

	if cid == "" {
		return e.JSON(echo.ErrBadRequest.Code, errors.ErrBadRequest)
	}

	serviceResp, serviceErr := l.serv.Delete(cid)

	if serviceErr != nil {
		return e.JSON(serviceErr.HttpStatus, serviceErr)
	}

	return e.JSON(200, models.HttpResponse{
		Code:    "20000",
		Message: "success",
		Data:    serviceResp,
	})
}
