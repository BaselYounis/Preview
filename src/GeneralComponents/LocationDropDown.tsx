import { Fragment, useState, type FunctionComponent } from "react";
import DropDownTemplate from "./DropDownTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faLocationDot } from "@fortawesome/free-solid-svg-icons";

interface LocationComponenetProps {
  location: string;
  onClick?: () => void;
  placeholder?: string;
}

const LocationComponenet: FunctionComponent<LocationComponenetProps> = ({
  location,
  ...props
}) => {
  return (
    <div
      className="flex flex-row items-center gap-x-2 text-primary-light 
  py-2 hover:bg-gray-200 transition-all duration-300 ease-in-out cursor-pointer"
      style={{ borderBottom: "1px solid #e5e7eb" }}
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={faLocationDot} className="text-gray-500 ml-2" />
      {location}
    </div>
  );
};

interface ChildrenProps {
  selectedLocation?: string;
  iconRotation?: number;
  placeholder?: string;
}

const Children: FunctionComponent<ChildrenProps> = ({
  selectedLocation,
  iconRotation,
  placeholder = "Select Location",
}) => {
  return (
    <Fragment>
      <FontAwesomeIcon
        icon={faLocationDot}
        className="text-primary-light mr-2"
      />
      <div className="font-[Poppins]">{selectedLocation || placeholder}</div>
      <FontAwesomeIcon
        icon={faArrowDown}
        className="text-primary-light ml-auto transition-all duration-300 ease-in-out"
        style={{ transform: `rotate(${iconRotation}deg)` }}
      />
    </Fragment>
  );
};

interface LocationDropDownProps {
  locations: string[];
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  placeholder?: string;
}

const LocationDropDown: FunctionComponent<LocationDropDownProps> = ({
  locations = ["Cairo", "Alexandria", "Giza", "Aswan", "Luxor"],
  selectedLocation,
  setSelectedLocation,
  placeholder = "Select Location",
}) => {
  const [opacity, setOpacity] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const onTriggerHandler = () => {
    setOpacity(1);
    setIconRotation(180);
    setTriggered(true);
  };
  const offTriggerHandler = () => {
    setOpacity(0);
    setIconRotation(0);
    setTimeout(() => {
      setTriggered(false);
    }, 300);
  };
  const [iconRotation, setIconRotation] = useState(0);
  const renderedLocations = locations.map((location, index) => (
    <LocationComponenet
      key={index}
      location={location}
      onClick={() => {
        setSelectedLocation?.(location);
        offTriggerHandler();
      }}
    />
  ));
  return (
    <DropDownTemplate
      children={
        <Children
          selectedLocation={selectedLocation}
          iconRotation={iconRotation}
          placeholder={placeholder}
        />
      }
      widthFactor={1.3}
      triggered={triggered}
      onTrigger={() => {
        onTriggerHandler();
      }}
      offTrigger={() => {
        offTriggerHandler();
      }}
      dropDownChildren={renderedLocations}
      dropDownStyle={{
        maxHeight: "200px",
        overflowY: "auto",
        opacity: opacity,
      }}
    />
  );
};

export default LocationDropDown;
