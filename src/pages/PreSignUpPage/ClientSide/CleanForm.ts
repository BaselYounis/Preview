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