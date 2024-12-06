package main

import (
	"lms_be/internal/adapters/handlers"
	"lms_be/internal/adapters/repositories"
	"lms_be/internal/adapters/repositories/postgres"
	"lms_be/internal/services"
	"log"

	"github.com/joho/godotenv"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	db := postgres.Connect()

	apiV1 := e.Group("/api/v1")

	customerTitleRepo := repositories.NewCustomerTitleRepositories(db)
	customerTitleServ := services.NewCustomerTitleService(customerTitleRepo)
	customerTitleHandl := handlers.NewCustomerTitleHandler(customerTitleServ)
	customerTitle := apiV1.Group("/customer-title")
	customerTitle.GET("/", customerTitleHandl.GetAll)

	educationRepo := repositories.NewEducationRepositories(db)
	educationServ := services.NewEducationService(educationRepo)
	educationHandl := handlers.NewEducationHandler(educationServ)
	education := apiV1.Group("/education")
	education.GET("/", educationHandl.GetAll)

	employmentRepo := repositories.NewEmploymentRepositories(db)
	employmentServ := services.NewEmploymentService(employmentRepo)
	employmentHandl := handlers.NewEmploymentHandler(employmentServ)
	employment := apiV1.Group("/employment")
	employment.GET("/", employmentHandl.GetAll)

	addressRepo := repositories.NewAddressRepositories(db)

	customerRepo := repositories.NewCustomerRepositories(db)
	customerServ := services.NewCustomerServices(customerRepo, addressRepo, customerTitleRepo)
	customerHandl := handlers.NewCustomerHandler(customerServ)

	customer := apiV1.Group("/customer")
	customer.POST("/new", customerHandl.New)
	customer.POST("/get-all", customerHandl.GetAll)
	customer.POST("/view", customerHandl.View)
	customer.POST("/edit", customerHandl.Edit)
	customer.POST("/remove", customerHandl.Remove)

	loanCriteriaRepo := repositories.NewLoanCriteriaRepositories(db)

	loanRepo := repositories.NewLoanRepositories(db)
	loanServ := services.NewLoanService(loanRepo, loanCriteriaRepo)
	loanHandl := handlers.NewLoanHandler(loanServ)

	loan := apiV1.Group("/loan")
	loan.POST("/", loanHandl.New)
	loan.GET("/:cid", loanHandl.Get)
	loan.POST("/dashboard", loanHandl.GetDashboardDetails)
	loan.PUT("/", loanHandl.Update)
	loan.DELETE("/:cid", loanHandl.Delete)

	paymentRepo := repositories.NewPaymentRepositories(db)
	paymentServ := services.NewPaymentService(paymentRepo)
	paymentHandl := handlers.NewPaymentHandler(paymentServ)

	payment := apiV1.Group("/payment")
	payment.POST("/", paymentHandl.New)
	payment.GET("/:pid", paymentHandl.Get)
	payment.GET("/dashboard", paymentHandl.GetDashboardDetails)
	payment.PUT("/", paymentHandl.Update)
	payment.DELETE("/:pid", paymentHandl.Delete)

	e.Logger.Fatal(e.Start(":1323"))
}
