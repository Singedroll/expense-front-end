import { useState } from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const AddRecord = ({ onCloseModal, userid }) => {
  const [incomeExpense, setIncomeExpense] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState();

  const { data, error } = useSWR("http://localhost:5050/category", fetcher);

  const handleIncomeOrExpense = () => {
    setIncomeExpense(incomeExpense === "Expense" ? "Income" : "Expense");
  };

  const handleAdd = async () => {
    const newTransaction = {
      name: incomeExpense,
      amount: parseInt(amount),
      transaction_type: incomeExpense === "Expense" ? "EXP" : "INC",
      description: description,
      user_id: userid,
      category_id: category,
      currency_type: "₮",
    };

    try {
      await axios.post("http://localhost:5050/transaction", newTransaction);
      alert("Transaction added successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to add transaction");
    }
  };
  console.log(category);
  if (error) return <div>Failed to load categories</div>;
  if (!data) return <div>Loading categories...</div>;

  return (
    <div className="w-[792px] flex flex-col rounded-xl border-b border-[#E2E8F0] bg-slate-200">
      <div className="py-5 px-6 flex justify-between">
        <p className="font-semibold text-xl">Add Record</p>
        <button onClick={onCloseModal}>Close</button>
      </div>
      <div className="flex w-full">
        <div className="px-6 pt-5 pb-6 flex flex-col gap-5">
          <div className="rounded-[100px] bg-[#F3F4F6] flex gap-1">
            <button
              onClick={handleIncomeOrExpense}
              className={`py-2 px-8 font-normal text-base rounded-3xl ${
                incomeExpense === "Expense" ? "bg-blue-500 text-white" : ""
              }`}
            >
              Expense
            </button>
            <button
              onClick={handleIncomeOrExpense}
              className={`py-2 px-8 font-normal text-base rounded-3xl ${
                incomeExpense === "Income" ? "bg-green-500 text-white" : ""
              }`}
            >
              Income
            </button>
          </div>
          <div className="flex flex-col mb-3 gap-[22px]">
            <div className="flex flex-col py-3 px-4 bg-[#F3F4F6] border border-[#D1D5DB] rounded-xl">
              <p className="font-normal text-base">Amount</p>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="₮ 000.00"
                className="font-normal text-xl bg-[#F3F4F6]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p>Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-[#F9FAFB] py-3 px-4 text-base font-normal border border-[#D1D5DB] rounded-lg"
              >
                <option value="">Find or choose category</option>
                {data?.message.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className={`py-2 rounded-3xl text-white ${
              incomeExpense === "Income" ? "bg-green-500" : "bg-blue-500"
            }`}
          >
            Add Record
          </button>
        </div>
        <div className="flex flex-col gap-2 px-6 pb-6 pt-[18px] w-full">
          <p>Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write here"
            className="bg-[#F3F4F6] pt-4 pl-4 border border-[#D1D5DB] w-full h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AddRecord;
