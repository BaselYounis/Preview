

export function phoneNumberValidator(phoneNumber: string): { success: boolean; message: string } {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
    if (!phoneRegex.test(phoneNumber)) {
        return { success: false, message: "Invalid phone number format." };
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

