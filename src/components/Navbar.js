import Logo from "../../public/icons/Logo";
import AddRecord from "./AddRecord";
import { useState } from "react";
import { useAuthContext } from "@/providers";

const Navbar = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isLoading, currentUser, signOut } = useAuthContext();

  const handleAdd = () => {
    setShowAdd(!showAdd);
  };

  const renderCurrentUserAvatar = () => {
    if (isLoading) {
      return <span className="loading loading-spinner loading-xs"></span>;
    }

    return <img src={currentUser?.avatar} alt="Profile" />;
  };

  const handleSignOut = () => {
    signOut();
    setShowProfileMenu(false);
  };

  return (
    <div className="bg-white w-full px-[120px] py-4 flex justify-between max-w-screen-xl relative">
      {showAdd && (
        <div className="z-50 fixed top-0 left-0 right-0 bottom-0 bg-gray-400 flex justify-center items-center">
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
      <div className="flex items-center gap-6 relative">
        <button
          className="bg-[#121213] py-1.5 px-3 text-white rounded-3xl text-base"
          onClick={() => handleAdd()}
        >
          + Record
        </button>

        <div className="avatar">
          <button
            className="w-10 h-10 rounded-full overflow-hidden"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            {renderCurrentUserAvatar()}
          </button>

          {showProfileMenu && (
            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg py-2 px-4 w-32">
              <button
                onClick={handleSignOut}
                className="text-red-500 hover:text-red-700 w-full text-left px-2 py-1"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
