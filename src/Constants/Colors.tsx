/**
 * Utility functions for accessing theme variables
 */

export const theme = {
    colors: {
      primaryDark: () => getCSSVariable('--color-primary-dark'),
      primaryLight: () => getCSSVariable('--color-primary-light'),
      whiteGray: () => getCSSVariable('--color-white-gray'),
      // Add more color getters as needed
    }
  };
  
  function getCSSVariable(variableName: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }