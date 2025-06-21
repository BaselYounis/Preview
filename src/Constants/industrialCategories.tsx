import { 

faRobot, 
faBolt, 
faCogs, 
faSlidersH, 
faLaptopCode, 
faShieldAlt, 
faTools, 
faTruckLoading, 
faSolarPanel, 
faHardHat, 
faSnowflake,
faExchangeAlt,
faBatteryThreeQuarters,
faThLarge,
faPlug,
faWrench,
faWater,
faBalanceScale,
faThermometerHalf,
faBug,
faCode,
faMobileAlt,
faCloud,
faBrain,
faLock,
faFire,
faKey,
faSitemap,
faAmbulance,
faClipboardCheck,
faStethoscope,
faCubes,
faUsersCog,
faShoppingCart,
faWind,
faLeaf,
faChartLine,
faExclamationTriangle,
faClipboardList,
faChalkboardTeacher,
faProjectDiagram,
faDesktop,
faNetworkWired,
faMicrochip
} from '@fortawesome/free-solid-svg-icons';

export const industrialCategories = {
  "Industrial Automation & Control": {
    icon: faRobot,
    color: "#f39c12",
    subcategories: [
      { name: "PLC Programming", icon: faProjectDiagram },
      { name: "SCADA Systems", icon: faDesktop },
      { name: "DCS Systems", icon: faNetworkWired },
      { name: "Industrial IoT", icon: faMicrochip }
    ]
  },
  "Electrical Engineering": {
    icon: faBolt,
    color: "#2980b9",
    subcategories: [
      { name: "Power Systems", icon: faPlug },
      { name: "Panel Design", icon: faThLarge },
      { name: "Energy Efficiency", icon: faBatteryThreeQuarters },
      { name: "Transformers", icon: faExchangeAlt }
    ]
  },
  "Mechanical Engineering": {
    icon: faCogs,
    color: "#7f8c8d",
    subcategories: [
      { name: "HVAC", icon: faSnowflake },
      { name: "Machinery Maintenance", icon: faWrench },
      { name: "Piping & Plumbing", icon: faWater }
    ]
  },
  "Instrumentation & Control": {
    icon: faSlidersH,
    color: "#8e44ad",
    subcategories: [
      { name: "Calibration", icon: faBalanceScale },
      { name: "Sensor Installation", icon: faThermometerHalf },
      { name: "Instrumentation Troubleshooting", icon: faBug }
    ]
  },
  "Software & Digital Solutions": {
    icon: faLaptopCode,
    color: "#2ecc71",
    subcategories: [
      { name: "Custom Software", icon: faCode },
      { name: "Industrial Apps", icon: faMobileAlt },
      { name: "Cloud Solutions", icon: faCloud },
      { name: "AI/ML Services", icon: faBrain }
    ]
  },
  "Cybersecurity & IT Services": {
    icon: faShieldAlt,
    color: "#e74c3c",
    subcategories: [
      { name: "OT Security", icon: faLock },
      { name: "Firewalls", icon: faFire },
      { name: "Secure Remote Access", icon: faKey },
      { name: "Network Design", icon: faSitemap }
    ]
  },
  "Maintenance & Field Services": {
    icon: faTools,
    color: "#d35400",
    subcategories: [
      { name: "Breakdown Support", icon: faAmbulance },
      { name: "Preventive Maintenance", icon: faClipboardCheck },
      { name: "Condition Monitoring", icon: faStethoscope }
    ]
  },
  "Supply Chain & Procurement": {
    icon: faTruckLoading,
    color: "#16a085",
    subcategories: [
      { name: "Spare Parts Sourcing", icon: faCubes },
      { name: "Vendor Management", icon: faUsersCog },
      { name: "Procurement Support", icon: faShoppingCart }
    ]
  },
  "Energy & Sustainability": {
    icon: faSolarPanel,
    color: "#27ae60",
    subcategories: [
      { name: "Renewable Energy", icon: faWind },
      { name: "Carbon Footprint Analysis", icon: faLeaf },
      { name: "Energy Audits", icon: faChartLine }
    ]
  },
  "Health, Safety & Environment (HSE)": {
    icon: faHardHat,
    color: "#c0392b",
    subcategories: [
      { name: "Risk Assessments", icon: faExclamationTriangle },
      { name: "Compliance Audits", icon: faClipboardList },
      { name: "Safety Training", icon: faChalkboardTeacher }
    ]
  }
};
