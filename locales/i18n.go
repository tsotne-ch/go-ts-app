package locales

import (
	"encoding/json"
	"io"
	"log"
	"os"
	"path/filepath"
)

type LocaleJSON struct {
}

func (Locale *LocaleJSON) LocaleString(language string, value string) string {

    path := ""

    if language != "en" && language != "ka" {
        log.Fatalf("%s is not a valid language", language)
		return ""
    } 

    if language == "en" {
        path = "en.json"
    } else {
        path = "ka.json"
    }

	file, err := os.Open(filepath.Join("locales", path))

	if err != nil {
        log.Fatalf("Error opening file: %v", err)
    }
	defer file.Close()

	data, err := io.ReadAll(file)
    if err != nil {
        log.Fatalf("Error reading file: %v", err)
    }

    var locales map[string]interface{}
    err = json.Unmarshal(data, &locales)
    if err != nil {
        log.Fatalf("Error unmarshalling JSON: %v", err)
    }

    if text, ok := locales[value].(string); ok {
        return text
    } else {
        log.Fatalf("Key %s not found or is not a string\n", value)
		return ""
    }
}
