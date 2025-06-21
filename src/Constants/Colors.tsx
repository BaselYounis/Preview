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

    industrialAutomation: () => getCSSVariable("--color-industrial-automation"),
    electricalEngineering: () => getCSSVariable("--color-electrical-engineering"),
    mechanicalEngineering: () => getCSSVariable("--color-mechanical-engineering"),
    instrumentationControl: () => getCSSVariable("--color-instrumentation-control"),
    softwareDigital: () => getCSSVariable("--color-software-digital"),
    cybersecurityIT: () => getCSSVariable("--color-cybersecurity-it"),
    maintenanceField: () => getCSSVariable("--color-maintenance-field"),
    supplyChain: () => getCSSVariable("--color-supply-chain"),
    energySustainability: () => getCSSVariable("--color-energy-sustainability"),
    hse: () => getCSSVariable("--color-hse"),
    // Add more color getters as needed
  },
};

function getCSSVariable(variableName: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
}
