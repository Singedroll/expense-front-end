import Navbar from "../components/Navbar";
import Income from "../components/Income";
import ExpenseLogo from "../../public/icons/ExpenseLogo";
import IncomeLogo from "../../public/icons/IncomeLogo";
import { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../../public/icons/Logo";
import WhiteLogo from "../../public/icons/WhiteLogo";
import currency from "currency.js";
import { useThemecontext } from "@/providers/Themecontext";
import Record from "@/components/OneRecord";

const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { records } = useThemecontext();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const incomeResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/sum`,
          { userid: 2, type: "INC" }
        );

        const expenseResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/sum`,
          { userid: 2, type: "EXP" }
        );

        const fetchedIncome = incomeResponse.data[0].sum;
        const fetchedExpense = expenseResponse.data[0].sum;

        setIncome(fetchedIncome);
        setExpense(fetchedExpense);
        setTotalAmount(fetchedIncome - fetchedExpense);
      } catch (error) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);
  const sumAmount = currency(totalAmount, {
    symbol: "",
    precision: 0,
  }).format();
  const sumExpense = currency(expense, {
    symbol: "",
    precision: 0,
  }).format();
  const sumIncome = currency(income, {
    symbol: "",
    precision: 0,
  }).format();

  return (
    <div className="bg-[#F3F4F6] flex flex-col gap-8 items-center container mx-auto">
      <Navbar />
      <div className="flex flex-col gap-6 w-full px-[120px]">
        <div className="flex gap-6">
          <div className="w-full rounded-[18px] bg-[#0166FF] p-8 flex flex-col justify-between items-start shadow-lg relative text-white">
            <div className="text-xl font-bold flex gap-2 items-center justify-center">
              <WhiteLogo />
              Geld
            </div>
            <div>
              <div className="mb-3">Cash</div>
              <div className="text-3xl font-bold">{sumAmount}</div>
            </div>
            <div className="self-end">
              <UnionLogo />
            </div>
          </div>

          <Income
            color={"#84CC16"}
            title={"Your Income"}
            money={sumIncome}
            text={"Your Income Amount"}
            description={"32% from last month"}
            icon={<IncomeLogo />}
          />
          <Income
            color={"#0166FF"}
            title={"Your Expense"}
            money={sumExpense}
            text={"Your Expense Amount"}
            description={"32% from last month"}
            icon={<ExpenseLogo />}
          />
        </div>
      </div>
      <div className="px-6">
        <div className="w-full">
          <p className="font-semibold text-base py-4">Last Records</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 mb-3 w-full ">
        {records?.map((transaction, index) => {
          return (
            <Record
              key={index}
              categoryname={transaction?.categoryName}
              transaction_type={transaction?.transaction_type}
              time={transaction.createdat}
              color={transaction.color}
              money={transaction.amount}
              currencytype={transaction.currency_type}
            />
          );
        })}
      </div>

      {error && <div className="text-red-500">{error}</div>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
