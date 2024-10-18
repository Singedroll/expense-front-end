import axios from "axios";
import { useContext } from "react";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "./AuthProvider";

const Themecontext = createContext();
export const useThemecontext = () => useContext(Themecontext);

export const ThemeProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { isLoading, currentUser } = useAuthContext();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/transactionid`,
        {
          userid: currentUser?.userId,
        }
      )
      .then(function (response) {
        setRecords(response.data.getUserTrans);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [currentUser]);

  return (
    <Themecontext.Provider value={{ records }}>
      {children}
    </Themecontext.Provider>
  );
};
