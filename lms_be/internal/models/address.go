package models

import "gorm.io/gorm/schema"

type Address struct {
	ContactName  string `json:"contact_name"`
	BuildingNo   string `json:"building_no" validate:"required"`
	BuildingName string `json:"building_name"`
	Floor        string `json:"floor"`
	RoomNo       string `json:"room_no"`
	VillageNo    string `json:"village_no"`
	Alley        string `json:"alley"`
	Street       string `json:"street"`
	Subdistrict  string `json:"sub_district" validate:"required"`
	District     string `json:"district" validate:"required"`
	Province     string `json:"province" validate:"required"`
	PostalCode   string `json:"postal_code" validate:"required"`
	HomePhone    string `json:"home_phone"`
}

type AddressRepo struct {
	Aid          string  `gorm:"aid"`
	Cid          string  `gorm:"cid"`
	ContactName  *string `gorm:"contact_name"`
	BuildingNo   string  `gorm:"building_no"`
	BuildingName *string `gorm:"building_name"`
	Floor        *string `gorm:"floor"`
	RoomNo       *string `gorm:"room_no"`
	VillageNo    *string `gorm:"village_no"`
	Alley        *string `gorm:"alley"`
	Street       *string `gorm:"street"`
	Subdistrict  string  `gorm:"sub_district"`
	District     string  `gorm:"district"`
	Province     string  `gorm:"province"`
	PostalCode   string  `gorm:"postal_code"`
	HomePhone    *string `gorm:"home_phone"`
}

func (c AddressRepo) TableName(namer schema.Namer) string {
	tbName := "addresses"
	if namer == nil {
		return tbName
	}
	return namer.TableName(tbName)
}
