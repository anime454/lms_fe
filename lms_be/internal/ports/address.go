package ports

import "lms_be/internal/models"

type AddressRepositories interface {
	New(addr models.AddressRepo) (int64, error)
	FindByCid(cid string) (*models.AddressRepo, error)
	Update(addr models.AddressRepo) (int64, error)
	Remove(addr models.AddressRepo) (int64, error)
}
