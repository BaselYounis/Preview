import { useState, type FunctionComponent } from "react";
import DropDownTemplate from "../../../GeneralComponents/DropDownTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faGlobe,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";

interface DropDownChildrenProps {
  setOnSite?: (onSite: boolean) => void;
}

const DropDownChildren: FunctionComponent<DropDownChildrenProps> = ({
  ...props
}) => {
  const choices = [
    { label: "Remote", value: false, icon: faGlobe },
    { label: "On-Site", value: true, icon: faToolbox },
  ];
  return (
    <div className="py-2 flex flex-col overflow-y-auto max-h-60">
      {choices.map((choice) => (
        <div
          key={choice.value.toString()}
          onClick={() => props.setOnSite?.(choice.value)}
          className="flex flex-row items-center px-4 py-2 border-b-[1px] border-gray-300 last:border-b-0 hover:bg-gray-200 cursor-pointer"
        >
          <FontAwesomeIcon icon={choice.icon} />
          <p className="ml-3 font-[Poppins]">{choice.label}</p>
        </div>
      ))}
    </div>
  );
};

interface ChildrenProps {
  triggered: boolean;
  on_site?: boolean;
}

const Children: FunctionComponent<ChildrenProps> = ({ ...props }) => {
  let text = "Select Remote/On-Site";
  if (props.on_site === true) text = "On-Site";
  else if (props.on_site === false) text = "Remote";

  return (
    <div className="flex flex-row items-center w-full">
      {props.on_site !=undefined && (
        <FontAwesomeIcon icon={props.on_site ? faToolbox : faGlobe} />
      )}
      <p className="font-[Poppins] ml-3">{text}</p>
      <FontAwesomeIcon
        icon={faArrowDown}
        className="ml-auto transition-all duration-300 ease-in-out"
        style={{
          transform: props.triggered ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
    </div>
  );
};

interface RemoteOnSiteDropdownProps {
  on_site?: boolean;
  setOnSite?: (onSite: boolean) => void;
}

const RemoteOnSiteDropdown: FunctionComponent<RemoteOnSiteDropdownProps> = ({
  ...props
}) => {
  const [triggered, setTriggered] = useState(false);
  return (
    <div onClick={() => setTriggered(!triggered)} className="mt-5">
      <DropDownTemplate
        triggered={triggered}
        children={<Children triggered={triggered} on_site={props.on_site} />}
        dropDownChildren={<DropDownChildren setOnSite={props.setOnSite} />}
        widthFactor={1.5}
      />
    </div>
  );
};

export default RemoteOnSiteDropdown;
