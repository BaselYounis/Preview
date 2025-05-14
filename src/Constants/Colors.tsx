/**
 * Utility functions for accessing theme variables
 */

export const theme = {
  colors: {
    primaryDark: () => getCSSVariable("--color-primary-dark"),
    primaryLight: () => getCSSVariable("--color-primary-light"),
    primaryLighter: () => getCSSVariable("--color-primary-lighter"),
    lightGray: () => getCSSVariable("--color-light-gray"),
    whiteGray: () => getCSSVariable("--color-white-gray"),
    errorRed: () => getCSSVariable("--color-error-red"),
    // Add more color getters as needed
  },
};

function getCSSVariable(variableName: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
}
