package repositories

import (
	"lms_be/internal/models"

	"gorm.io/gorm"
)

type customerRepositories struct {
	db *gorm.DB
}

func NewCustomerRepositories(db *gorm.DB) *customerRepositories {
	return &customerRepositories{
		db: db,
	}
}

func (r *customerRepositories) New(cust models.CustomerRepo) (int64, error) {
	tx := r.db.Create(&cust)
	return tx.RowsAffected, tx.Error
}

func (r *customerRepositories) Find(limit, offset uint64) ([]models.GetAllCustomerRepo, error) {
	customers := []models.GetAllCustomerRepo{}
	err := r.db.Debug().Limit(int(limit)).Offset(int(offset)).Order("created_date ASC").Find(&customers).Error
	return customers, err
}

func (r *customerRepositories) FindById(cid string) (*models.CustomerRepo, error) {
	customerRepo := models.CustomerRepo{}
	err := r.db.Where("cid = ?", cid).Order("created_date DESC").First(&customerRepo).Error
	return &customerRepo, err
}

func (r *customerRepositories) Count() (int64, error) {
	var c int64
	err := r.db.Model(models.CustomerRepo{}).Count(&c).Error
	return c, err
}

func (r *customerRepositories) FindWithAllById(cid string) (*models.CustomerRepoWithAll, error) {
	customerWithAddress := models.CustomerRepoWithAll{}
	err := r.db.Debug().Model(models.CustomerRepo{}).Select("*").
		Joins("left join lms.customer_title_list ctl on customers.title_id = ctl.tid").
		Joins("left join lms.addresses a on customers.cid = a.cid").
		Joins("left join lms.education_list el on customers.education_id = el.eid").
		Joins("left join lms.employment_list eml on customers.employment_id = eml.emid").
		Where("customers.cid = ?", cid).
		Order("customers.created_date DESC").
		Scan(&customerWithAddress).Error
	return &customerWithAddress, err
}

func (r *customerRepositories) Update(cust models.CustomerRepo) (int64, error) {
	tx := r.db.Where("cid = ?", cust.Cid).Updates(&cust)
	return tx.RowsAffected, tx.Error
}

func (r *customerRepositories) Remove(cust models.CustomerRepo) (int64, error) {
	tx := r.db.Where("cid = ?", cust.Cid).Delete(&cust)
	return tx.RowsAffected, tx.Error
}
