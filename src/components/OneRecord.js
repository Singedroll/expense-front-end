import categoryIconByCategoryName from "@/util/findCategoryicon";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { ClientPageRoot } from "next/dist/client/components/client-page";

const Record = (props) => {
  const { time, money, categoryname, transaction_type, currencytype } = props;
  const iconColor = transaction_type === "EXP" ? "#FF4545" : "#0166FF";
  const textColor = transaction_type === "EXP" ? "#F54949" : "#23E01F";
  const minusText = transaction_type === "EXP" ? "-" : "+";

  const icon = categoryIconByCategoryName(props);

  return (
    <div className="w-full px-6 py-3 border bg-white border-[#E5E7EB] items-center justify-between flex rounded-xl">
      <div className="flex gap-4">
        <div
          className={`flex justify-center items-center w-10 h-10 rounded-full bg-[${iconColor}]`}
          style={{
            backgroundColor: iconColor,
          }}
        >
          {icon?.image}
        </div>

        <div className="flex flex-col">
          <p className="font-normal text-base">{categoryname}</p>
          <p className="font-normal text-xs text-[#6B7280]">
            {format(new Date(time), "yyyy-MM-dd")}
          </p>
        </div>
      </div>

      <p
        className={`font-semibold text-base`}
        style={{
          color: textColor,
        }}
      >
        {minusText} {money} {currencytype}
      </p>
    </div>
  );
};

export default Record;
