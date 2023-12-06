import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import MainContext from "../contextApi/MainContext";

export default function useQuizList(quizId) {
  const [quizList, setQuizList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);

  const { user } = useContext(MainContext);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      let url = `${baseUrl}/quizzes/${quizId}`;
      if (user?.regNumber > 100 && user?.regNumber <= 110) {
        url = `${baseUrl}/quizzesM/${quizId}`;
      }
      try {
        const res = await fetch(url, {
          method: "get",
        });
        const data = await res.json();

        if (data === 412) {
          setQuizOpen(false);
          toast.error("পরীক্ষা এর সময় ৮ ডিসেম্বর সকাল ৮ টা - দুপুর ১ টা");
        } else {
          setQuizList(data);
          setQuizOpen(true);
          localStorage.setItem("quiz", JSON.stringify(data));
        }
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [quizId, baseUrl, user?.regNumber]);

  const values = {
    quizList,
    isLoading,
    isError,
    quizOpen,
  };

  return values;
}
