package pkg

import (
	"fmt"

	"github.com/go-playground/validator"
)

func RequestValidator(i interface{}) string {
	message := ""
	if i == nil {
		return message
	}

	validate := validator.New()
	err := validate.Struct(i)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			message = fmt.Sprintf("%s is require", err.Field())
		}
		return message
	}

	return message
}
