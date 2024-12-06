package repositories

import (
	"lms_be/internal/models"

	"gorm.io/gorm"
)

type loanCriteriaRepositories struct {
	db *gorm.DB
}

func NewLoanCriteriaRepositories(db *gorm.DB) *loanCriteriaRepositories {
	return &loanCriteriaRepositories{
		db: db,
	}
}

func (l *loanCriteriaRepositories) Create(req models.CriteriaRepo) (int64, error) {
	tx := l.db.Create(&req)
	return tx.RowsAffected, tx.Error
}

func (l *loanCriteriaRepositories) Get(cid string) (models.CriteriaRepo, error) {
	c := models.CriteriaRepo{}
	err := l.db.Where("cid = ?", cid).Find(&c).Error
	return c, err
}
