package services

import (
	"fmt"
	"lms_be/internal/errors"
	"lms_be/internal/models"
	"lms_be/internal/ports"
	"lms_be/pkg"
	dateformat "lms_be/pkg/date_format"
	"time"

	"github.com/google/uuid"
)

type paymentService struct {
	repo ports.PaymentRepositories
	// criRepo ports.LoanCriteriaRepositories
}

func NewPaymentService(
	repo ports.PaymentRepositories,
) *paymentService {
	return &paymentService{
		repo: repo,
	}
}

func (p *paymentService) New(req models.NewPaymentReq) (*models.NewPaymentResp, *models.ServiceError) {
	if errMsg := pkg.RequestValidator(req); errMsg != "" {
		errResp := errors.ErrBadRequest
		errResp.Message = errMsg
		return nil, &errResp
	}

	pid, _ := uuid.NewRandom()
	dTime, _ := time.Parse(dateformat.DDMMYYYYHHmmss, req.DueDate)
	payment := models.PaymentRepo{
		Pid:          pid.String(),
		Cid:          req.Cid,
		Lid:          req.Lid,
		DueDate:      dTime,
		Status:       req.Status,
		Amount:       req.Amount,
		InterestRate: req.InterestRate,
	}

	rows, err := p.repo.Create(payment)
	if rows <= 0 || err != nil {
		return nil, &errors.ErrBadRequest
	}

	return &models.NewPaymentResp{Pid: pid.String()}, nil
}

func (p *paymentService) Get(pid string) (*models.PaymentData, *models.ServiceError) {
	pay, err := p.repo.Get(pid)
	if err != nil {
		fmt.Println(err)
		return nil, &errors.ErrBadRequest
	}

	resp := &models.PaymentData{
		Pid:          pay.Pid,
		Cid:          pay.Cid,
		Lid:          pay.Lid,
		DueDate:      pay.DueDate,
		Status:       pay.Status,
		Amount:       pay.Amount,
		InterestRate: pay.InterestRate,
	}

	return resp, nil
}

func (p *paymentService) GetDashboardDetails(limit, offset int64) (*models.GetPaymentDashboardDetailResp, *models.ServiceError) {
	ps, err := p.repo.GetDashboardDetails(limit, offset)
	if err != nil {
		return nil, &errors.ErrBadRequest
	}

	payments := []models.PaymentData{}
	for _, p := range ps {
		payments = append(payments, models.PaymentData(p))
	}

	c, _ := p.repo.Count()

	return &models.GetPaymentDashboardDetailResp{
		Payment: payments,
		Total:   c,
	}, nil
}

func (p *paymentService) Update(req models.UpdatePaymentReq) (*models.UpdatePaymentResp, *models.ServiceError) {

	if errMsg := pkg.RequestValidator(req); errMsg != "" {
		errResp := errors.ErrBadRequest
		errResp.Message = errMsg
		return nil, &errResp
	}

	d, _ := time.Parse(dateformat.DDMMYYYYHHmmss, req.DueDate)
	payment := models.PaymentRepo{
		Pid:          req.Pid,
		Cid:          req.Cid,
		Lid:          req.Lid,
		DueDate:      d,
		Status:       req.Status,
		Amount:       req.Amount,
		InterestRate: req.InterestRate,
	}

	rows, err := p.repo.Update(payment)
	if rows <= 0 || err != nil {
		fmt.Println(err)
		return nil, &errors.ErrBadRequest
	}

	return &models.UpdatePaymentResp{
		Pid: req.Pid,
	}, nil

}

func (p *paymentService) Delete(pid string) (string, *models.ServiceError) {

	rows, err := p.repo.Delete(pid)
	if rows <= 0 || err != nil {
		return "", &errors.ErrBadRequest
	}

	return pid, nil
}
