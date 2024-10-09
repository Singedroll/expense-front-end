import FoodExpense from "../../public/icons/FoodExpenseIcon";
import Gift from "../../public/icons/Gift";
import RentIcon from "../../public/icons/RentIcon";
import Shopping from "../../public/icons/Shopping";
import Taxi from "../../public/icons/Taxi";

const icons = [
  {
    color: "#23E01F",
    image: <RentIcon />,
    name: "Housing",
  },
  {
    color: "#F54949",
    image: <RentIcon />,
    name: "Housing",
  },
  {
    color: "#23E01F",
    image: <FoodExpense />,
    name: "Food & Drinks",
  },
  {
    color: "#F54949",
    image: <FoodExpense />,
    name: "Food & Drinks",
  },
  {
    color: "#23E01F",
    image: <Shopping />,
    name: "Shopping",
  },
  {
    color: "#F54949",
    image: <Shopping />,
    name: "Shopping",
  },
  {
    color: "#23E01F",
    image: <Gift />,
    name: "Gift",
  },
  {
    color: "#F54949",
    image: <Gift />,
    name: "Gift",
  },
  {
    color: "#23E01F",
    image: <Taxi />,
    name: "Transportation",
  },
  {
    color: "#F54949",
    image: <Taxi />,
    name: "Transportation",
  },
];

const categoryIconByCategoryName = (props) => {
  const icon = icons.find((icon) => icon.name === props.categoryname);

  return icon;
};
export default categoryIconByCategoryName;
