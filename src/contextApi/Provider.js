import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MainContext from "./MainContext";

const ContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();

  const initialize = async () => {
    // Check if user has already entered information
    if (localStorage.getItem("user")) {
      const localUser = JSON.parse(localStorage.getItem("user"));
      setUser({
        name: localUser.name,
        regNumber: localUser.regNumber,
        phone: localUser.phone,
        quizDone: localUser.quizDone,
        quizId: localUser.quizId,
      });
    }
  };

  const login = async (regNumber, phone) => {
    const params = {
      regNumber: regNumber,
      phone: phone,
    };
    try {
      const res = await fetch(`${baseUrl}/login`, {
        method: "post",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.status === 200) {
        setUser({
          name: data.name,
          regNumber: regNumber,
          phone: phone,
          quizDone: data.quizCompleted,
          quizId: data.quizId,
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: data.name,
            regNumber: regNumber,
            phone: phone,
            quizDone: data.quizCompleted,
            quizId: data.quizId,
          })
        );
        navigate("/quiz");
      } else if (data.status === 402) {
        toast.error("আপনি রেজিস্ট্রেশন ফি দেন নি।");
      } else {
        toast.error(
          "আপনার রেজিস্ট্রেশন নম্বর অথবা ফোন নম্বর ভুল। আবার চেষ্টা করুন।"
        );
      }
    } catch (error) {
      toast.error("অসুবিধার জন্য দুঃখিত। আবার চেষ্টা করুন।");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const submitQuiz = async (quizzes) => {
    let data = {
      quizzes: quizzes,
      user: user,
    };
    try {
      if (user != null) {
        const res = await fetch(`${baseUrl}/submit`, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          setUser({ ...user, quizDone: true });
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: user.name,
              phone: user.phone,
              regNumber: user.regNumber,
              quizDone: true,
              quizId: user.quizId,
            })
          );
          toast.success("আপনার উত্তর সফলভাবে জমা হয়েছে। ধন্যবাদ।");
        }
        if (res.status === 406) {
          toast.error("দুঃখিত সময় শেষ হয়ে গিয়েছে।");
        }
      } else toast.error("অসুবিধার জন্য দুঃখিত। আবার চেষ্টা করুন।");
    } catch {
      toast.error("অসুবিধার জন্য দুঃখিত। আবার চেষ্টা করুন।");
    }
  };

  return (
    <MainContext.Provider
      value={{
        user,
        login,
        submitQuiz,
        logout,
        initialize,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
export default ContextProvider;
