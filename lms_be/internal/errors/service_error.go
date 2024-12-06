package errors

import "lms_be/internal/models"

func NewServiceError(httpStatus int, code string, message string) models.ServiceError {
	return models.ServiceError{HttpStatus: httpStatus, Code: code, Message: message}
}

var (
	ErrInternalServerError = NewServiceError(500, "E50000", "internal server error")
	ErrBadRequest          = NewServiceError(400, "R40000", "bad request")
	ErrRollBackCustomer    = NewServiceError(500, "E50001", "internal server error")

	ErrNewCustomer      = NewServiceError(200, "C20001", "can not create customer")
	ErrCustomerNotFound = NewServiceError(200, "C20002", "customer not found")
	ErrUpdateCustomer   = NewServiceError(200, "C20003", "can not update customer")
	ErrRemoveCustomer   = NewServiceError(200, "C20004", "can not remove customer")

	ErrNewAddress      = NewServiceError(200, "A20001", "can not create address")
	ErrAddressNotFound = NewServiceError(200, "A20002", "address not found")
	ErrUpdateAddress   = NewServiceError(200, "A20003", "can not update address")
	ErrRemoveAddress   = NewServiceError(200, "A20004", "can not remove address")

	ErrLoanNotFound = NewServiceError(200, "L20002", "loan not found")
)
