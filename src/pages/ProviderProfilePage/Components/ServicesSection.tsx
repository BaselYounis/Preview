import type { CSSProperties } from "@mui/material";
import { Fragment, useState } from "react";
import Button from "../../../GeneralComponents/Button";
import { faAdd, faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../../Constants/Colors";
import ServiceCard from "./ServiceCard";
import MakeServicePopUpComponent from "./MakeServicePopUp";

function ServicesSection() {
  const [isHovered, setIsHovered] = useState(false);
  const style: CSSProperties = {
    boxShadow: isHovered ? "0px 0px 2px rgba(50, 50, 50, 0.3)" : "none",
    border: isHovered ? "1px solid #E0E0E0" : "1px solid transparent",
  };
  const [makeServicePopUpOpen, setMakeServicePopUpOpen] = useState(false);
  return (
    <Fragment>
      {  makeServicePopUpOpen && <MakeServicePopUpComponent
        isOpen={makeServicePopUpOpen}
        onClose={() => setMakeServicePopUpOpen(false)}
      />}
      <div
        className="flex flex-col w-full bg-white hover:border-1
        hover:-translate-y-1 mt-10 rounded-[10px] p-2 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={style}
      >
        <div className="flex flex-row items-center font-[500] font-[Poppins] text-primary-light text-2xl">
          Your Services
          <Button
            label={undefined}
            icon={faAdd}
            className="ml-auto"
            widthFactor={0.5}
            onHoverColor={theme.colors.primaryLight()}
            onHoverTextColor="white"
            sizeFactor={0.7}
            onClick={() => {
              setMakeServicePopUpOpen(true);
            }}
          />
        </div>
        <div className="flex flex-row gap-x-2 mt-5">
          <ServiceCard
            service={{
              main_category: "Cybersecurity & IT Services",
              sub_category: { name: "Network Design", icon: faNetworkWired },
              description:
                "Designing secure and efficient network infrastructures.",
              pay_rate: 50,
              on_site: false,
              is_active: true,
              available_on: new Date(),
            }}
          />
          <ServiceCard
            service={{
              main_category: "Cybersecurity & IT Services",
              sub_category: { name: "Network Design", icon: faNetworkWired },
              description:
                "Designing secure and efficient network infrastructures.",
              pay_rate: 50,
              on_site: false,
              is_active: true,
              available_on: new Date(),
            }}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default ServicesSection;
