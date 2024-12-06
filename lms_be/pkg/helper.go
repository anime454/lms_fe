package pkg

func DerefString(s *string) string {
	if s == nil {
		return ""
	}
	return *s
}

func DerefFloat64(f *float64) float64 {
	if f == nil {
		return 0
	}
	return *f
}
