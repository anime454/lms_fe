package repositories

import (
	"lms_be/internal/models"

	"gorm.io/gorm"
)

type loanRepositories struct {
	db *gorm.DB
}

func NewLoanRepositories(db *gorm.DB) *loanRepositories {
	return &loanRepositories{
		db: db,
	}
}

func (l *loanRepositories) Create(req models.LoanRepo) (int64, error) {
	tx := l.db.Create(&req)
	return tx.RowsAffected, tx.Error
}

func (l *loanRepositories) Get(lid string) (models.LoanRepo, error) {
	resp := models.LoanRepo{}
	err := l.db.Where("lid = ?", lid).Find(&resp).Error
	return resp, err
}

func (l *loanRepositories) GetDashboardDetails(limit, offset int64) ([]models.GetLoanDashboardDetailRepo, error) {
	loans := []models.GetLoanDashboardDetailRepo{}
	err := l.db.Debug().Limit(int(limit)).Offset(int(offset)).Order("created_date ASC").Find(&loans).Error
	return loans, err
}

func (l *loanRepositories) Count() (int64, error) {
	var c int64
	err := l.db.Model(models.LoanRepo{}).Count(&c).Error
	return c, err
}

func (l *loanRepositories) Update(req models.LoanRepo) (int64, error) {
	tx := l.db.Where("lid = ?", req.Lid).Updates(&req)
	return tx.RowsAffected, tx.Error
}

func (l *loanRepositories) Delete(lid string) (int64, error) {
	tx := l.db.Where("lid = ?", lid).Delete(models.LoanRepo{})
	return tx.RowsAffected, tx.Error
}
