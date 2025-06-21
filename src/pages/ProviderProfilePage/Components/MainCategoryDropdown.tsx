import { useState, type FunctionComponent } from "react";
import DropDownTemplate from "../../../GeneralComponents/DropDownTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { industrialCategories } from "../../../Constants/industrialCategories";
import type { MainCategory } from "../HelperFunctions";

interface DropDownChildrenProps {
  setMainCategory: (category: MainCategory) => void;
}

const DropDownChildren: FunctionComponent<DropDownChildrenProps> = ({
  setMainCategory,
}) => {
  const renderedCategories = Object.keys(industrialCategories).map(
    (category) => (
      <div
        key={category}
        className="flex flex-row w-full items-center text-left px-4 py-2 hover:bg-gray-200 cursor-pointer border-b-[1px] border-gray-300 last:border-b-0"
        onClick={() => {
          setMainCategory(category as MainCategory);
        }}
      >
        <FontAwesomeIcon
          icon={
            industrialCategories[category as keyof typeof industrialCategories]
              .icon
          }
          style={{
            color:
              industrialCategories[
                category as keyof typeof industrialCategories
              ].color,
          }}
        />
        <p className="font-[Poppins] ml-3">{category}</p>
      </div>
    )
  );
  return (
    <div className="flex flex-col py-2 overflow-y-auto max-h-60 ">
      {renderedCategories}
    </div>
  );
};

interface ChildrenProps {
  mainCategory?: MainCategory;
  triggered: boolean;
}

const Children = ({ mainCategory, triggered }: ChildrenProps) => {
  return (
    <div className="flex flex-row items-center w-full">
      {mainCategory && (
      <FontAwesomeIcon
        icon={
          industrialCategories[
            mainCategory as keyof typeof industrialCategories
          ].icon
        }
        style={{
          color: `${industrialCategories[mainCategory as keyof typeof industrialCategories].color}`,
        }}
      />
      )}
      <p className="font-[Poppins] ml-3">{mainCategory || "Select Main Category"}</p>
      <FontAwesomeIcon
        icon={faArrowDown}
        className="ml-auto transition-all duration-300 ease-in-out"
        style={{ transform: triggered ? "rotate(180deg)" : "rotate(0deg)" }}
      />
    </div>
  );
};

interface MainCategoryDropdownProps {
  mainCategory?: MainCategory;
  setMainCategory: (category: MainCategory) => void;
  style?: React.CSSProperties;
  className?: string;
}

const MainCategoryDropdown: FunctionComponent<MainCategoryDropdownProps> = ({
  style,
  className,
  mainCategory,
  setMainCategory,
}) => {
  const [triggered, setTriggered] = useState<boolean>(false);

  return (
    <div
      onClick={() => setTriggered(!triggered)}
      style={style}
      className={className}
    >
      <DropDownTemplate
        widthFactor={1.5}
        triggered={triggered}
        dropDownChildren={
          <DropDownChildren setMainCategory={setMainCategory} />
        }
        children={
          <Children mainCategory={mainCategory} triggered={triggered} />
        }
      />
    </div>
  );
};

export default MainCategoryDropdown;
