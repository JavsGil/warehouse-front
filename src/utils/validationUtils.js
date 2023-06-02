

export const validateForm = (formValues, validationRules) => {
    const validationErrors = {};
  
    Object.entries(validationRules).forEach(([fieldName, rules]) => {
      const fieldValue = formValues[fieldName].trim();
      
      if (rules.required && fieldValue === "") {
        validationErrors[fieldName] = rules.errorMessage;
      }
      
      if (rules.numeric && fieldValue !== "" && !/^\d+$/.test(fieldValue)) {
        validationErrors[fieldName] = rules.errorMessage;
      }
    });
  
    return validationErrors;
  };
  