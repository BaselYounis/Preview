export function GeneralTextCleaner(arg: string): string {
    // Remove all spaces from the input string
    return arg.replace(/\s+/g, '');
}
export function NameCleaner(arg: string): string {
    // Remove all non-alphabetic characters from the input string
    return arg.replace(/[^a-zA-Z]/g, '');
}

export function PhoneNumberCleaner(arg: string): string {
    // Remove all non-digit characters from the input string
    return arg.replace(/\D/g, '');
}

export function SingleCharacterCleaner(arg: string): string {
    // If the input is empty, return empty string
    if (!arg) return '';
    
    // Return only the last character of the input string
    return arg.charAt(arg.length - 1);
}


export function SingleDigitCleaner(arg: string): string {
    // If the input is empty, return empty string
    if (!arg) return '';
    
    // Get the last character
    const lastChar = arg.charAt(arg.length - 1);
    
    // If last character is a digit, return it
    if (/\d/.test(lastChar)) {
        return lastChar;
    }
    
    // If last character is not a digit, return the value without the last character
    // If there's only one character and it's not a digit, return empty string
    return arg.length > 1 ? arg.slice(0, -1) : '';
}