package repositories

import (
	"lms_be/internal/models"

	"gorm.io/gorm"
)

type addressRepositories struct {
	db *gorm.DB
}

func NewAddressRepositories(db *gorm.DB) *addressRepositories {
	return &addressRepositories{
		db: db,
	}
}

func (a *addressRepositories) New(addr models.AddressRepo) (int64, error) {
	tx := a.db.Create(addr)
	return tx.RowsAffected, tx.Error
}

func (a *addressRepositories) FindByCid(cid string) (*models.AddressRepo, error) {
	addressRepo := models.AddressRepo{}
	err := a.db.Where("cid = ?", cid).Order("created_date DESC").First(&addressRepo).Error
	return &addressRepo, err
}

func (a *addressRepositories) Update(addr models.AddressRepo) (int64, error) {
	tx := a.db.Where("cid = ?", addr.Cid).Updates(&addr)
	return tx.RowsAffected, tx.Error
}

func (r *addressRepositories) Remove(addr models.AddressRepo) (int64, error) {
	tx := r.db.Where("cid = ?", addr.Cid).Delete(&addr)
	return tx.RowsAffected, tx.Error
}
