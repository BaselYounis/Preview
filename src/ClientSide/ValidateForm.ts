

export function phoneNumberValidator(phoneNumber: string): { success: boolean; message: string } {
    // Egyptian phone numbers:
    // - Can start with +20 (international format)
    // - Can start with 00 or 0 (local format)
    // - Followed by 10 or 11 (mobile operators)
    // - Total digits: 11 for local format (0 + 10 digits) or 12-13 for international format
    const egyptPhoneRegex = /^(\+20|0020|0)(10|11|12|15)\d{8}$/;
    
    if (!egyptPhoneRegex.test(phoneNumber)) {
        return { 
            success: false, 
            message: "Invalid Egyptian phone number. Use format: 01XXXXXXXXX or +201XXXXXXXXX" 
        };
    }
    return { success: true, message: "Phone number is valid." };
}


export function emailValidator(email: string): { success: boolean; message: string } {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return { success: false, message: "Invalid email format." };
    }
    return { success: true, message: "Email is valid." };
}


export function passwordValidator(password: string): { success: boolean; message: string } {
    if (password.length < 8) {
        return { success: false, message: "Password must be at least 8 characters long." };
    }
    if (!/\d/.test(password)) {
        return { success: false, message: "Password must contain at least one number." };
    }
    if (!/[!@#$%^&*]/.test(password)) {
        return { success: false, message: "Password must contain at least one special character." };
    }
    return { success: true, message: "Password is valid." };
}


export function confirmPasswordValidator(password: string, confirmPassword: string): { success: boolean; message: string } {
    // First validate the password itself
    const passwordValidation = passwordValidator(password);
    if (!passwordValidation.success) {
        return passwordValidation;
    }
    
    // Then check if passwords match
    if (password !== confirmPassword) {
        return { success: false, message: "Passwords do not match." };
    }
    return { success: true, message: "Passwords match." };
}





export function nameValidator(name: string): { success: boolean; message: string } {
    if (name.length < 2) {
        return { success: false, message: "Name must be at least 2 characters long." };
    }
    
    // Check for English letters only
    const englishLettersRegex = /^[a-zA-Z]+$/;
    if (!englishLettersRegex.test(name)) {
        return { success: false, message: "Name must contain only English letters." };
    }
    
    return { success: true, message: "Name is valid." };
}

export function companyNameValidator(companyName: string): { success: boolean; message: string } {
    // Remove leading and trailing whitespace
    const trimmedName = companyName.trim();
    
    if (trimmedName.length < 2) {
        return { success: false, message: "Company name must be at least 2 characters long." };
    }
    
    // Check if the name contains any alphanumeric characters (not just symbols)
    if (!/[a-zA-Z0-9]/.test(trimmedName)) {
        return { success: false, message: "Company name must contain at least one letter or number." };
    }
    
    // Check for invalid characters (optional - adjust as needed)
    const invalidCharsRegex = /[^\w\s&'(),."-]/;
    if (invalidCharsRegex.test(trimmedName)) {
        return { 
            success: false, 
            message: "Company name contains invalid characters. Only letters, numbers, spaces, and basic punctuation are allowed." 
        };
    }
    
    return { success: true, message: "Company name is valid." };
}