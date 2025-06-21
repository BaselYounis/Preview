import { useState, type FunctionComponent } from "react";
import type { MainCategory, SubCategory } from "../HelperFunctions";
import DropDownTemplate from "../../../GeneralComponents/DropDownTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { industrialCategories } from "../../../Constants/industrialCategories";

interface DropdownChildrenProps {
  setSubCategory?: (category: SubCategory) => void;
  mainCategory: MainCategory;
}

const DropdownChildren: FunctionComponent<DropdownChildrenProps> = ({
  setSubCategory,
  mainCategory,
}) => {
  const renderedSubCategories = industrialCategories[
    mainCategory
  ].subcategories.map((subCategory) => {
    return (
      <div
        key={subCategory.name}
        onClick={() => setSubCategory?.(subCategory)}
        className="px-4 py-2 border-b-[1px] border-gray-300 last:border-b-0 hover:bg-gray-200 cursor-pointer flex flex-row items-center"
      >
        <FontAwesomeIcon icon={subCategory.icon} />
        <p className="font-[Poppins] ml-3">{subCategory.name}</p>
      </div>
    );
  });
  return <div className="flex flex-col py-2">{renderedSubCategories}</div>;
};

interface ChildrenProps {
  subCategory?: SubCategory;
  triggered: boolean;
}

const Children: FunctionComponent<ChildrenProps> = ({
  subCategory,
  triggered,
}) => {
  return (
    <div className="flex flex-row w-full items-center">
      {subCategory && <FontAwesomeIcon icon={subCategory?.icon} />}
      <p className="font-[Poppins] ml-3">
        {subCategory?.name || "Select Sub-Category"}
      </p>
      <FontAwesomeIcon
        icon={faArrowDown}
        className="ml-auto transition-all duration-300 ease-in-out"
        style={{ transform: triggered ? "rotate(180deg)" : "rotate(0deg)" }}
      />
    </div>
  );
};

interface SubCategoryDropdownProps {
  mainCategory?: MainCategory;
  subCategory?: SubCategory;
  setSubCategory: (category: SubCategory) => void;
}

const SubCategoryDropdown: FunctionComponent<SubCategoryDropdownProps> = ({
  mainCategory,
  subCategory,
  setSubCategory,
}) => {
  const [triggered, setTriggered] = useState(false);
  if (!mainCategory) return null;
  return (
    <div onClick={() => setTriggered(!triggered)} className="mt-5">
      <DropDownTemplate
        widthFactor={1.5}
        triggered={triggered}
        children={<Children subCategory={subCategory} triggered={triggered} />}
        dropDownChildren={
          <DropdownChildren
            setSubCategory={setSubCategory}
            mainCategory={mainCategory}
          />
        }
      />
    </div>
  );
};

export default SubCategoryDropdown;
