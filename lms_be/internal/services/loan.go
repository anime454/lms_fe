package services

import (
	"fmt"
	"lms_be/internal/errors"
	"lms_be/internal/models"
	"lms_be/internal/ports"
	"lms_be/pkg"
	"strings"

	"github.com/google/uuid"
)

type loanService struct {
	repo    ports.LoanRepositories
	criRepo ports.LoanCriteriaRepositories
}

func NewLoanService(
	repo ports.LoanRepositories,
	criRepo ports.LoanCriteriaRepositories,
) *loanService {
	return &loanService{
		repo:    repo,
		criRepo: criRepo,
	}
}

func (l *loanService) New(req models.NewLoanReq) (*models.NewLoanResp, *models.ServiceError) {

	if errMsg := pkg.RequestValidator(req); errMsg != "" {
		errResp := errors.ErrBadRequest
		errResp.Message = errMsg
		return nil, &errResp
	}

	criteriaIds := ""
	for _, c := range req.Criteria {

		cid, _ := uuid.NewRandom()

		cri := models.CriteriaRepo{
			Cid:           cid.String(),
			RiskProfile:   c.RiskProfile,
			AssetNature:   c.NatureOfAssets,
			MinAssetValue: int64(c.MinimumValueOfAssets),
			CreditScore:   int64(c.CreditScore),
		}

		rows, err := l.criRepo.Create(cri)
		if rows <= 0 || err != nil {
			fmt.Println(err)
			continue
		}

		criteriaIds += fmt.Sprintf("|%s", cid.String())
	}

	lid, _ := uuid.NewRandom()

	loan := models.LoanRepo{
		Lid:                    lid.String(),
		Name:                   req.Name,
		Description:            req.Description,
		Criteria:               criteriaIds,
		CharacteristicType:     req.Characteristics.Type,
		AmortizationDuration:   req.Characteristics.AmortizationPeriod.Duration,
		AmortizationPeriodType: req.Characteristics.AmortizationPeriod.Type,
		InterestRateType:       req.Characteristics.InterestRate.Type,
		InterestRateValue:      req.Characteristics.InterestRate.Value,
		MaximumLoanAmount:      req.Characteristics.MaxValue,
	}

	rows, err := l.repo.Create(loan)
	if rows <= 0 || err != nil {
		fmt.Println(err)
		return nil, &errors.ErrBadRequest
	}

	return &models.NewLoanResp{
		Lid: lid.String(),
	}, nil
}

func (l *loanService) Get(lid string) (*models.LoanData, *models.ServiceError) {
	lo, err := l.repo.Get(lid)
	if err != nil {
		fmt.Println(err)
		return nil, &errors.ErrBadRequest
	}

	cris := []models.Criteria{}
	crisStr := strings.Split(lo.Criteria, "|")
	for _, cri := range crisStr {
		if cri != "" {
			c, err := l.criRepo.Get(cri)
			if err != nil {
				continue
			}
			cris = append(cris, models.Criteria{
				RiskProfile:          c.RiskProfile,
				NatureOfAssets:       c.AssetNature,
				MinimumValueOfAssets: float64(c.MinAssetValue),
				CreditScore:          int(c.CreditScore),
			})
		}
	}

	resp := &models.LoanData{
		Lid:         lo.Lid,
		Name:        lo.Name,
		Description: lo.Description,
		Criteria:    cris,
		Characteristics: models.Characteristics{
			Type: lo.CharacteristicType,
			AmortizationPeriod: models.AmortizationPeriod{
				Duration: lo.AmortizationDuration,
				Type:     lo.AmortizationPeriodType,
			},
			InterestRate: models.InterestRate{
				Type:  lo.InterestRateType,
				Value: lo.InterestRateValue,
			},
			MaxValue: lo.MaximumLoanAmount,
		},
	}

	return resp, nil
}

func (l *loanService) GetDashboardDetails(req models.GetLoanDashboardDetailReq) (*models.GetLoanDashboardDetailResp, *models.ServiceError) {

	if req.Limit == 0 {
		req.Limit = 100
	}

	queryResult, err := l.repo.GetDashboardDetails(int64(req.Limit), int64(req.Offset))
	if err != nil {
		return nil, &errors.ErrLoanNotFound
	}

	loans := []models.GetLoanDashboardDetailData{}
	for _, lo := range queryResult {

		cris := []models.Criteria{}
		crisStr := strings.Split(lo.Criteria, "|")
		for _, cri := range crisStr {
			if cri != "" {
				c, err := l.criRepo.Get(cri)
				if err != nil {
					continue
				}
				cris = append(cris, models.Criteria{
					RiskProfile:          c.RiskProfile,
					NatureOfAssets:       c.AssetNature,
					MinimumValueOfAssets: float64(c.MinAssetValue),
					CreditScore:          int(c.CreditScore),
				})
			}
		}

		loans = append(loans, models.GetLoanDashboardDetailData(models.GetLoanDashboardDetailData{
			Lid:               lo.Lid,
			Name:              lo.Name,
			RiskProfile:       cris[0].RiskProfile,
			InterestRateType:  lo.InterestRateType,
			InterestRateValue: lo.InterestRateValue,
			MaximumLoanAmount: lo.MaximumLoanAmount,
		}))
	}

	total, _ := l.repo.Count()

	return &models.GetLoanDashboardDetailResp{
		Loans: loans,
		Total: total,
	}, nil
}

func (l *loanService) Update(req models.UpdateLoanReq) (*models.UpdateLoanResp, *models.ServiceError) {

	if errMsg := pkg.RequestValidator(req); errMsg != "" {
		errResp := errors.ErrBadRequest
		errResp.Message = errMsg
		return nil, &errResp
	}

	criteriaIds := ""
	for _, c := range req.Criteria {
		// TODO: refacto this function remove old one before insert a new one
		cid, _ := uuid.NewRandom()
		cri := models.CriteriaRepo{
			Cid:           cid.String(),
			RiskProfile:   c.RiskProfile,
			AssetNature:   c.NatureOfAssets,
			MinAssetValue: int64(c.MinimumValueOfAssets),
			CreditScore:   int64(c.CreditScore),
		}

		rows, err := l.criRepo.Create(cri)
		if rows <= 0 || err != nil {
			fmt.Println(err)
			continue
		}

		criteriaIds += fmt.Sprintf("|%s", cid.String())
	}

	loan := models.LoanRepo{
		Lid:                    req.Lid,
		Name:                   req.Name,
		Description:            req.Description,
		Criteria:               criteriaIds,
		CharacteristicType:     req.Characteristics.Type,
		AmortizationDuration:   req.Characteristics.AmortizationPeriod.Duration,
		AmortizationPeriodType: req.Characteristics.AmortizationPeriod.Type,
		InterestRateType:       req.Characteristics.InterestRate.Type,
		InterestRateValue:      req.Characteristics.InterestRate.Value,
		MaximumLoanAmount:      req.Characteristics.MaxValue,
	}

	rows, err := l.repo.Update(loan)
	if rows <= 0 || err != nil {
		fmt.Println(err)
		return nil, &errors.ErrBadRequest
	}

	return &models.UpdateLoanResp{
		Lid: req.Lid,
	}, nil

}

func (l *loanService) Delete(lid string) (string, *models.ServiceError) {

	rows, err := l.repo.Delete(lid)
	if rows <= 0 || err != nil {
		return "", &errors.ErrBadRequest
	}

	return lid, nil
}
