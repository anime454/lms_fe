package postgres

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

func Connect() *gorm.DB {
	host := os.Getenv("host")
	username := os.Getenv("username")
	password := os.Getenv("password")
	dbName := os.Getenv("db_name")
	port := os.Getenv("port")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", host, username, password, dbName, port)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			TablePrefix:   "lms.",
			SingularTable: true,
		},
	})
	if err != nil {
		panic(err)
	}

	return db
}
