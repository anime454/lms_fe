package services

import (
	"fmt"
	"lms_be/internal/errors"
	"lms_be/internal/models"
	"lms_be/internal/ports"
	"lms_be/pkg"
	dateformat "lms_be/pkg/date_format"

	"github.com/google/uuid"
)

type customerServices struct {
	repo              ports.CustomerRepositories
	addrRepo          ports.AddressRepositories
	customerTitleRepo ports.CustomerTitleRepositories
}

func NewCustomerServices(
	repo ports.CustomerRepositories,
	addrRepo ports.AddressRepositories,
	customerTitleRepo ports.CustomerTitleRepositories,
) *customerServices {
	return &customerServices{
		repo:              repo,
		addrRepo:          addrRepo,
		customerTitleRepo: customerTitleRepo,
	}
}

func (c *customerServices) New(req models.NewCustomerReq) (*models.NewCustomerResp, *models.ServiceError) {
	if errMsg := pkg.RequestValidator(req); errMsg != "" {
		errResp := errors.ErrBadRequest
		errResp.Message = errMsg
		return nil, &errResp
	}

	cid, _ := uuid.NewRandom()
	customerRepo := models.CustomerRepo{
		Cid:          cid.String(),
		TitleId:      req.TitleId,
		THName:       req.THName,
		ENName:       &req.ENName,
		THLastname:   req.THLastname,
		ENLastname:   &req.ENLastname,
		IdCard:       req.IdCard,
		PassportNo:   &req.PassportNo,
		MobileNo:     req.MobileNo,
		Email:        &req.Email,
		EducationId:  req.EducationId,
		EmploymentId: req.EmploymentId,
		Salary:       &req.Salary,
		Status:       "ACTIVE",
		OtherIncome:  &req.OtherIncome,
	}
	rows, err := c.repo.New(customerRepo)

	if rows <= 0 || err != nil {
		fmt.Println(err)
		return nil, &errors.ErrNewCustomer
	}

	aid, _ := uuid.NewRandom()
	rows, err = c.addrRepo.New(models.AddressRepo{
		Aid:          aid.String(),
		Cid:          cid.String(),
		ContactName:  &req.Address.ContactName,
		BuildingNo:   req.Address.BuildingNo,
		BuildingName: &req.Address.BuildingName,
		Floor:        &req.Address.Floor,
		RoomNo:       &req.Address.RoomNo,
		VillageNo:    &req.Address.VillageNo,
		Alley:        &req.Address.Alley,
		Street:       &req.Address.Street,
		Subdistrict:  req.Address.Subdistrict,
		District:     req.Address.District,
		Province:     req.Address.Province,
		PostalCode:   req.Address.PostalCode,
		HomePhone:    &req.Address.HomePhone,
	})

	if rows <= 0 || err != nil {
		fmt.Println(err)

		// Rollback create customer
		rows, err := c.repo.Remove(customerRepo)
		if rows <= 0 || err != nil {
			fmt.Println(err)
			return nil, &errors.ErrRollBackCustomer
		}

		return nil, &errors.ErrNewAddress
	}

	return &models.NewCustomerResp{Cid: cid.String()}, nil
}

func (c *customerServices) View(req models.ViewCustomerReq) (*models.ViewCustomerResp, *models.ServiceError) {
	if errMsg := pkg.RequestValidator(req); errMsg != "" {
		errResp := errors.ErrBadRequest
		errResp.Message = errMsg
		return nil, &errResp
	}

	customer, err := c.repo.FindById(req.Cid)
	if customer == nil || err != nil {
		fmt.Println(err)
		return nil, &errors.ErrCustomerNotFound
	}

	customerWithAll, err := c.repo.FindWithAllById(req.Cid)
	if customerWithAll == nil || err != nil {
		fmt.Println(err)
		return nil, &errors.ErrCustomerNotFound
	}

	return &models.ViewCustomerResp{
		Cid: req.Cid,
		Customer: models.Customer{
			Title: models.CustomerTitle{
				Tid:         customerWithAll.CustomerTitleRepo.Tid,
				THName:      customerWithAll.CustomerTitleRepo.THName,
				ENName:      customerWithAll.CustomerTitleRepo.ENName,
				CreatedDate: customerWithAll.CustomerTitleRepo.CreatedDate.Format(dateformat.DDMMYYYYHHmmss),
				UpdatedDate: customerWithAll.CustomerTitleRepo.UpdatedDate.Format(dateformat.DDMMYYYYHHmmss),
			},
			THName:     customerWithAll.CustomerRepo.THName,
			ENName:     pkg.DerefString(customerWithAll.CustomerRepo.ENName),
			THLastname: customerWithAll.CustomerRepo.THLastname,
			ENLastname: pkg.DerefString(customerWithAll.CustomerRepo.ENLastname),
			IdCard:     customerWithAll.CustomerRepo.IdCard,
			PassportNo: pkg.DerefString(customerWithAll.CustomerRepo.PassportNo),
			Address: models.Address{
				ContactName:  pkg.DerefString(customerWithAll.AddressRepo.ContactName),
				BuildingNo:   customerWithAll.AddressRepo.BuildingNo,
				BuildingName: pkg.DerefString(customerWithAll.AddressRepo.BuildingName),
				Floor:        pkg.DerefString(customerWithAll.AddressRepo.Floor),
				RoomNo:       pkg.DerefString(customerWithAll.AddressRepo.RoomNo),
				VillageNo:    pkg.DerefString(customerWithAll.AddressRepo.VillageNo),
				Alley:        pkg.DerefString(customerWithAll.AddressRepo.Alley),
				Street:       pkg.DerefString(customerWithAll.AddressRepo.Street),
				Subdistrict:  customerWithAll.AddressRepo.Subdistrict,
				District:     customerWithAll.AddressRepo.District,
				Province:     customerWithAll.AddressRepo.Province,
				PostalCode:   customerWithAll.AddressRepo.PostalCode,
				HomePhone:    pkg.DerefString(customerWithAll.AddressRepo.HomePhone),
			},
			MobileNo: customerWithAll.CustomerRepo.MobileNo,
			Email:    pkg.DerefString(customerWithAll.CustomerRepo.Email),
			Education: models.Education{
				Eid:         customerWithAll.EducationRepo.Eid,
				THName:      customerWithAll.EducationRepo.THName,
				ENName:      customerWithAll.EducationRepo.ENName,
				Details:     customerWithAll.EducationRepo.Details,
				CreatedDate: customerWithAll.EducationRepo.CreatedDate.Format(dateformat.DDMMYYYYHHmmss),
				UpdatedDate: customerWithAll.EducationRepo.UpdatedDate.Format(dateformat.DDMMYYYYHHmmss),
			},
			Employment: models.Employment{
				Emid:        customerWithAll.EmploymentRepo.Emid,
				THName:      customerWithAll.EmploymentRepo.THName,
				ENName:      customerWithAll.EmploymentRepo.ENName,
				Details:     customerWithAll.EmploymentRepo.Details,
				CreatedDate: customerWithAll.EmploymentRepo.CreatedDate.Format(dateformat.DDMMYYYYHHmmss),
				UpdatedDate: customerWithAll.EmploymentRepo.UpdatedDate.Format(dateformat.DDMMYYYYHHmmss),
			},
			Salary:      pkg.DerefFloat64(customerWithAll.CustomerRepo.Salary),
			Status:      customerWithAll.Status,
			OtherIncome: pkg.DerefFloat64(customerWithAll.CustomerRepo.OtherIncome),
		},
	}, nil
}

func (c *customerServices) Edit(req models.EditCustomerReq) (*models.EditCustomerResp, *models.ServiceError) {
	if errMsg := pkg.RequestValidator(req); errMsg != "" {
		errResp := errors.ErrBadRequest
		errResp.Message = errMsg
		return nil, &errResp
	}

	customer, err := c.repo.FindById(req.Cid)
	if customer == nil || err != nil {
		fmt.Println(err)
		return nil, &errors.ErrCustomerNotFound
	}

	rows, err := c.repo.Update(models.CustomerRepo{
		Cid:          req.Cid,
		TitleId:      req.TitleId,
		THName:       req.THName,
		ENName:       &req.ENName,
		THLastname:   req.THLastname,
		ENLastname:   &req.ENLastname,
		IdCard:       req.IdCard,
		PassportNo:   &req.PassportNo,
		MobileNo:     req.MobileNo,
		Email:        &req.Email,
		EducationId:  req.EducationId,
		EmploymentId: req.EmploymentId,
		Salary:       &req.Salary,
		OtherIncome:  &req.OtherIncome,
	})
	if rows <= 0 || err != nil {
		fmt.Println(err)
		return nil, &errors.ErrUpdateCustomer
	}

	address, err := c.addrRepo.FindByCid(req.Cid)
	if address == nil || err != nil {
		fmt.Println(err)
		return nil, &errors.ErrAddressNotFound
	}

	rows, err = c.addrRepo.Update(models.AddressRepo{
		Aid:          address.Aid,
		Cid:          req.Cid,
		ContactName:  &req.Address.ContactName,
		BuildingNo:   req.Address.BuildingNo,
		BuildingName: &req.Address.BuildingName,
		Floor:        &req.Address.Floor,
		RoomNo:       &req.Address.RoomNo,
		VillageNo:    &req.Address.VillageNo,
		Alley:        &req.Address.Alley,
		Street:       &req.Address.Street,
		Subdistrict:  req.Address.Subdistrict,
		District:     req.Address.District,
		Province:     req.Address.Province,
		PostalCode:   req.Address.PostalCode,
		HomePhone:    &req.Address.HomePhone,
	})
	if rows <= 0 || err != nil {
		fmt.Println(err)

		// Rollback customer
		rows, err := c.repo.Update(*customer)
		if rows <= 0 || err != nil {
			return nil, &errors.ErrRollBackCustomer
		}

		return nil, &errors.ErrUpdateAddress
	}

	return &models.EditCustomerResp{
		Cid: req.Cid,
	}, nil
}

func (c *customerServices) Remove(req models.RemoveCustomerReq) (*models.RemoveCustomerResp, *models.ServiceError) {
	if errMsg := pkg.RequestValidator(req); errMsg != "" {
		errResp := errors.ErrBadRequest
		errResp.Message = errMsg
		return nil, &errResp
	}

	// TODO: Add finding customer before remove customer becuase if we can not remove address we must rollback by insert customer again
	rows, err := c.repo.Remove(models.CustomerRepo{Cid: req.Cid})
	if rows <= 0 || err != nil {
		fmt.Println(err)
		return nil, &errors.ErrRemoveCustomer
	}

	rows, err = c.addrRepo.Remove(models.AddressRepo{Cid: req.Cid})
	if rows <= 0 || err != nil {
		fmt.Println(err)
		return nil, &errors.ErrRemoveAddress
	}

	return &models.RemoveCustomerResp{Cid: req.Cid}, nil
}

func (c *customerServices) GetAll(req models.GetAllCustomerReq) (*models.GetAllCustomerResp, *models.ServiceError) {

	if req.Limit == 0 {
		req.Limit = 100
	}

	queryResult, err := c.repo.Find(req.Limit, req.Offset)
	if err != nil {
		return nil, &errors.ErrCustomerNotFound
	}

	customers := []models.GetAllCustomerDetailResp{}
	for _, cust := range queryResult {
		customers = append(customers, models.GetAllCustomerDetailResp{
			Cid:         cust.Cid,
			THName:      cust.THName,
			THLastname:  cust.THLastname,
			IdCard:      cust.IdCard,
			PassportNo:  cust.PassportNo,
			MobileNo:    cust.MobileNo,
			Status:      cust.Status,
			CreatedDate: cust.CreatedDate.Format(dateformat.DDMMYYYYHHmmss),
		})
	}

	total, _ := c.repo.Count()

	return &models.GetAllCustomerResp{
		Customers: customers,
		Total:     total,
	}, nil
}
