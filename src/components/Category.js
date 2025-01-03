import EyeIcon from "../../public/icons/EyeIcon";
import ClosedEyeIcon from "../../public/icons/ClosedEyeIcon";
import { useState } from "react";

const MyCategories = (props) => {
  const { categoryName, onVisibilityChange } = props;
  const [checked, setChecked] = useState("true");

  const handleClick = () => {
    const newChecked = checked === "true" ? "false" : "true";
    setChecked(newChecked);
    onVisibilityChange?.(newChecked === "true");
  };

  const icon = checked === "true" ? <EyeIcon /> : <ClosedEyeIcon />;
  return (
    <div
      onClick={() => handleClick()}
      className="w-full pl-3 py-1.5 flex gap-2 items-center"
    >
      {icon}
      <p className="font-normal text-base text-[#1F2937]">{categoryName}</p>
    </div>
  );
};

export default MyCategories;
