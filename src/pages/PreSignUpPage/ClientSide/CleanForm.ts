export function GeneralTextCleaner(arg: string): string {
    // Remove all spaces from the input string
    return arg.replace(/\s+/g, '');
}