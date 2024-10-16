import Logo from "../../public/icons/Logo";
import AddRecord from "./AddRecord";
import { useState } from "react";
import { FaChevronLeft, FaSearchengin } from "react-icons/fa6";
import PlusSign from "../../public/icons/PlusSign";
import { FaAngleRight } from "react-icons/fa6";
import RentIcon from "../../public/icons/RentIcon";
import FoodExpense from "../../public/icons/FoodExpenseIcon";
import { useAuthContext } from "@/providers";

const Navbar = (props) => {
  const [showAdd, setShowAdd] = useState(false);
  const { isLoading, currentUser } = useAuthContext();
  const { onClick } = props;
  const handleAdd = () => {
    setShowAdd(!showAdd);
  };

  const renderCurrentUserAvatar = () => {
    if (isLoading) {
      return <span className="loading loading-spinner loading-xs"></span>;
    }

    return <img src={currentUser?.avatar} />;
  };
  return (
    <div className="bg-white w-full px-[120px] py-4 flex justify-between max-w-screen-xl">
      {showAdd && (
        <div className="z-999 fixed top-0 left-0 right-0 bottom-0 bg-gray-400 flex justify-center items-center">
          <AddRecord onCloseModal={handleAdd} />
        </div>
      )}
      <div className="flex gap-6 items-center">
        <Logo />
        <a href="./dashboard">
          <p> Dashboard </p>
        </a>
        <a href="./"> Records</a>
      </div>
      <div className="flex items-center gap-6">
        <button
          className="bg-[#121213] py-1.5 px-3 text-white rounded-3xl text-base"
          onClick={() => handleAdd()}
        >
          + Record
        </button>

        <div className="avatar">
          <div className="w-10 rounded-full">{renderCurrentUserAvatar()}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
