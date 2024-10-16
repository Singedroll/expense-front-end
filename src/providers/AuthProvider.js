import { useEffect, createContext, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = createContext({
  currentUser: null,
  isLoading: false,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
      console.log(parsedUser);
    }

    setIsLoading(false);
  }, [isLoading]);

  useEffect(() => {
    if (!currentUser && !isLoading) {
      router.push("/signin");
    }
  }, [currentUser, isLoading]);

  const signin = async (email, password) => {
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signin`,
        {
          email: email,
          password: password,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: data?.myuser?.[0]?.email,
          userId: data?.myuser?.[0]?.id,
          avatar: data?.myuser?.[0]?.avatar_img,
        })
      );

      setCurrentUser({
        email: data?.myuser?.[0]?.email,
        userId: data?.myuser?.[0]?.id,
        avatar: data?.myuser?.[0]?.avatar_img,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        signin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
