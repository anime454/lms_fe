package repositories

import (
	"lms_be/internal/models"

	"gorm.io/gorm"
)

type paymentRepositories struct {
	db *gorm.DB
}

func NewPaymentRepositories(db *gorm.DB) *paymentRepositories {
	return &paymentRepositories{
		db: db,
	}
}

func (p *paymentRepositories) Create(req models.PaymentRepo) (int64, error) {
	tx := p.db.Create(&req)
	return tx.RowsAffected, tx.Error
}

func (p *paymentRepositories) Get(pid string) (*models.PaymentRepo, error) {
	resp := models.PaymentRepo{}
	err := p.db.Where("pid = ?", pid).Find(&resp).Error
	return &resp, err
}

func (p *paymentRepositories) GetDashboardDetails(limit, offset int64) ([]models.PaymentRepo, error) {
	payments := []models.PaymentRepo{}
	err := p.db.Debug().Limit(int(limit)).Offset(int(offset)).Order("created_date ASC").Find(&payments).Error
	return payments, err
}

func (p *paymentRepositories) Count() (int64, error) {
	var c int64
	err := p.db.Model(models.PaymentRepo{}).Count(&c).Error
	return c, err
}

func (p *paymentRepositories) Update(req models.PaymentRepo) (int64, error) {
	tx := p.db.Where("pid = ?", req.Pid).Updates(&req)
	return tx.RowsAffected, tx.Error
}

func (p *paymentRepositories) Delete(pid string) (int64, error) {
	tx := p.db.Where("pid = ?", pid).Delete(models.PaymentRepo{})
	return tx.RowsAffected, tx.Error
}
