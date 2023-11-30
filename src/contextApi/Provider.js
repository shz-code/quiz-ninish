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
        quizDone: localUser.quizDone,
        quizId: localUser.quizId,
      });
    }
  };

  const modifyUser = async (name, cls, institute, district, quizCategory) => {
    try {
      const res = await fetch(`${baseUrl}/modifyUser`, {
        method: "post",
        body: JSON.stringify({
          name: name,
          cls: cls,
          institute: institute,
          district: district,
          quizCategory: quizCategory,
          regNumber: Number(localStorage.getItem("regNumber")),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.status === 200) {
        setUser({
          name: name,
          quizId: quizCategory,
          regNumber: Number(localStorage.getItem("regNumber")),
          quizDone: false,
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: name,
            quizId: quizCategory,
            regNumber: Number(localStorage.getItem("regNumber")),
            quizDone: false,
          })
        );
      }
      navigate("/quiz");
    } catch (error) {}
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
          quizDone: data.quizCompleted,
          quizId: data.quizId,
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: data.name,
            regNumber: regNumber,
            quizDone: data.quizCompleted,
            quizId: data.quizId,
          })
        );
        navigate("/quiz");
      } else if (data.status === 201) {
        localStorage.setItem("regNumber", regNumber);
        navigate("/n");
      } else if (data.status === 402) {
        toast.error("আপনি রেজিস্ট্রেশন ফি দেন নি।");
      } else if (data.status === 401) {
        toast.error(
          "আপনি ঢাকা পর্বের জন্য রেজিস্ট্রেশন করেন নি/ ভুল নম্বর দিয়েছেন"
        );
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
    localStorage.removeItem("user");
    localStorage.removeItem("quiz");
  };

  const submitQuiz = async (quizzes, quizTime, minutes, seconds) => {
    let params = {
      quizzes: quizzes,
      user: user,
      totalTime: quizTime,
      minutes: minutes,
      seconds: seconds,
    };
    try {
      if (user != null) {
        const res = await fetch(`${baseUrl}/submit`, {
          method: "post",
          body: JSON.stringify(params),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status === 200) {
          setUser({ ...user, quizDone: true });
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: user.name,
              regNumber: user.regNumber,
              quizDone: true,
              quizId: user.quizId,
            })
          );
          toast.success("আপনার উত্তর সফলভাবে জমা হয়েছে। ধন্যবাদ।");
        } else if (data.status === 409) {
          toast.error("আপনি একবার কুইজ জমা দিয়েছেন");
          setUser({ ...user, quizDone: true });
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: user.name,
              regNumber: user.regNumber,
              quizDone: true,
              quizId: user.quizId,
            })
          );
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
        modifyUser,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
export default ContextProvider;
