import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import MyCategories from "@/components/Category";
import PlusSign from "../../public/icons/PlusSign";
import { FaChevronLeft, FaSearchengin } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import RentIcon from "../../public/icons/RentIcon";
import FoodExpense from "../../public/icons/FoodExpenseIcon";
import AddRecord from "@/components/AddRecord";
import { Categories } from "@/components/Categories";
import axios from "axios";
import Record from "../components/OneRecord";
import AddCategory from "@/components/AddCategory";
import { useAuthContext } from "@/providers";
import { useRouter } from "next/router";

let userid = 0;
const Home = () => {
  const { isLoading, currentUser } = useAuthContext();
  const [showAdd, setShowAdd] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const [selected, setSelected] = useState("All");
  const [selectedEyes, setSelectedEyes] = useState();
  const [userTransaction, setUserTransaction] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    userid = currentUser?.userId;
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/transactionid`,
        {
          userid: currentUser?.userId,
        }
      )
      .then(function (response) {
        console.log(response);
        setUserTransaction(response.data.getUserTrans);
        setRecords(response.data.getUserTrans);
        console.log(response.data.getUserTrans);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [currentUser]);

  const handleCategory = (input, index) => {
    let myCategories = [...selectedEyes];
    if (input === "true") {
      myCategories[index] = "false";
    } else {
      myCategories[index] = "true";
    }
    setSelectedEyes(myCategories);
    let filteredCategories = [];
    for (let i = 0; i < categories.length; i++) {
      if (selectedEyes[i] === "true") {
        filteredCategories.push(selectedCategories[i]);
      }
    }
    setCheckedCategories();
  };

  const handleExpense = () => {
    const filtered = userTransaction.filter((Record) =>
      Record.transaction_type.includes("EXP")
    );
    setRecords(filtered);
  };

  const handleIncome = () => {
    const filtered = userTransaction.filter((Record) =>
      Record.transaction_type.includes("INC")
    );
    setRecords(filtered);
  };

  const handleAll = () => {
    setRecords(userTransaction);
  };

  const handleChange = (option) => {
    setSelected(option);
  };

  const handleAdd = () => {
    setShowAdd(!showAdd);
  };

  const handleAddCategory = () => {
    setShowAddCategory(!showAddCategory);
  };

  if (isLoading) {
    return <p>...loading</p>;
  }
  console.log(records);

  return (
    <div>
      {showAdd && (
        <div className="z-30 fixed top-0 left-0 right-0 bottom-0 bg-gray-400 flex justify-center items-center">
          <AddRecord userid={userid} onCloseModal={handleAdd} />
        </div>
      )}

      {showAddCategory && (
        <div className="z-30 fixed top-0 left-0 right-0 bottom-0 bg-gray-400 flex justify-center items-center">
          <AddCategory userid={userid} onCloseModal={handleAddCategory} />
        </div>
      )}

      <div className={`bg-[#F3F4F6] flex flex-col gap-8 items-center relative`}>
        <Navbar />

        <div className="flex gap-6">
          <div className="bg-white flex flex-col px-6 py-4 w-[282px] gap-6 rounded-xl h-fit border border-[#E5E7EB]">
            <div className="flex flex-col gap-6">
              <p> Records </p>
              <button
                onClick={() => handleAdd()}
                className="flex gap-1 w-[225px] bg-[#0166FF] rounded-3xl text-white items-center justify-center"
              >
                <PlusSign color="white" /> Add
              </button>
            </div>
            <input
              placeholder="Search"
              className="border border-[#D1D5DB] rounded-lg px-4 py-1"
            />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-base text-[#1F2937] mb-3">
                Types
              </p>
              <div className="flex items-center gap-2 px-3 py-1.5">
                <input
                  type="checkbox"
                  checked={"All" === selected}
                  className="checkbox"
                  onChange={() => handleChange("All")}
                  onClick={() => handleAll()}
                />
                All
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5">
                <input
                  type="checkbox"
                  checked={"Income" === selected}
                  className="checkbox"
                  onChange={() => handleChange("Income")}
                  onClick={() => handleIncome()}
                />
                Income
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5">
                <input
                  type="checkbox"
                  checked={"Expense" === selected}
                  className="checkbox"
                  onChange={() => handleChange("Expense")}
                  onClick={() => handleExpense()}
                />
                Expense
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="font-semibold text-base">Category</p>
                <p className="font-normal text-base text-neutral-400 ">Clear</p>
              </div>
              <div>
                <Categories />
              </div>
              <button
                onClick={handleAddCategory}
                className="flex items-center pl-2 gap-3"
              >
                <PlusSign color={"#0166FF"} />
                <p>Add category</p>
              </button>
            </div>
          </div>
          <div className="w-[894px] flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-lg p-1.5 bg-[#E5E7EB]">
                  <FaChevronLeft />
                </div>
                <p className="font-normal text-base"> Last 30 Days</p>
                <div className="w-8 h-8 rounded-lg p-1.5 bg-[#E5E7EB]">
                  <FaAngleRight />
                </div>
              </div>
              <select className="w-[180px] py-3 px-4 rounded-lg font-semibold text-base text-[#1F2937] border border-[#D1D5DB]">
                <option selected>Newest First</option>
                <option value="">Latest First</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-base">Today</p>

              <div className="flex flex-col gap-3 mb-3">
                {records?.map((transaction, index) => {
                  return (
                    <Record
                      key={index}
                      categoryname={transaction?.categoryName}
                      transaction_type={transaction?.transaction_type}
                      time={transaction.categoryDate}
                      color={transaction.color}
                      money={transaction.amount}
                      currencytype={transaction.currency_type}
                    />
                  );
                })}
              </div>
              <p className="font-semibold text-base">History</p>
              <div className="flex flex-col gap-3">{/*  */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
