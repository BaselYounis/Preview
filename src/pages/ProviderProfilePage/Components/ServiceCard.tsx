import type { FunctionComponent } from "react";
import type { serviceData } from "../HelperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { industrialCategories } from "../../../Constants/industrialCategories";
import { faGlobe, faToolbox } from "@fortawesome/free-solid-svg-icons";


interface ServiceCardProps {
  service: serviceData;
  className?: string;
  style?: React.CSSProperties;
}

const ServiceCard: FunctionComponent<ServiceCardProps> = ({
  service,
  ...props
}) => {
  if (!service.available_on || !service.main_category || !service.sub_category) {
    return (<div>Bad Service Data</div>);
  }
  return (
    <div
      className={`flex flex-col h-fit max-h-150 w-150 bg-white hover:-translate-y-1 hover:shadow-xl 
         hover:border-[#D5D5D5]  border-[1px] border-[#EAEAEA] rounded-[10px] p-4  transition-all duration-300 ${props.className || ""}`}
      style={props.style}
    >
      <div className="flex flex-row items-center ">
        <div
          className="flex flex-col w-fit items-center justify-center p-2  rounded-[5px] "
          style={{
            backgroundColor: `${industrialCategories[service.main_category].color}20`,
          }}
        >
          <FontAwesomeIcon
            icon={industrialCategories[service.main_category].icon}
            className="text-2xl"
            style={{ color: industrialCategories[service.main_category].color }}
          />
        </div>
        <div className="flex flex-col gap-y-0.5">
          <p className="font-[Poppins] font-[500] ml-5">
            {service.main_category}
          </p>
          <div className="flex flex-row items-center gap-x-2 font-[Poppins] font-[400] ml-5 text-xs mt-1">
            <FontAwesomeIcon icon={service.sub_category.icon} />
            {service.sub_category.name}
          </div>
        </div>
        {service.on_site ===true && (
          <div className="ml-auto flex flex-row gap-x-2">
            <FontAwesomeIcon icon={faToolbox} />{" "}
            <p className="font-[Poppins] font-[400] text-xs">On Site</p>
          </div>
        )}
        {service.on_site ===false && (
          <div className="ml-auto flex flex-row gap-x-2">
            <FontAwesomeIcon icon={faGlobe} />{" "}
            <p className="font-[Poppins] font-[400] text-xs">Remote</p>
          </div>
        )}
      </div>
      <div className="font-[Poppins] font-[400] mt-5 text-gray-500 overflow-y-auto">
        {service.description}
      </div>
      <div className="flex flex-row items-center mt-5">
          <p className="font-[Poppins] font-[400]">
            From {service.pay_rate}$/hour
          </p>
          <p className="ml-auto font-[Poppins] font-[400] text-xs text-gray-400">
            Available On: {service.available_on.toLocaleDateString()}
          </p>
      </div>
    </div>
  );
};

export default ServiceCard;
