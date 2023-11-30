import _ from "lodash";
import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import MainContext from "../../../../contextApi/MainContext";
import quizContext from "../../../../contextApi/QuizContext";
import Question from "./Question";

export default function Quiz({ setGotQuiz, id, forceQuizSubmit, quizTime }) {
  const [loadedQuiz, setLoadedQuiz] = useState(false);
  const [loading, setLoading] = useState(false);

  const [quizzes, setQuizzes] = useState({});

  const { user, submitQuiz } = useContext(MainContext);

  // Initialize form localStorage
  const initializeState = () => {
    const quizzes = JSON.parse(localStorage.getItem("quiz"));
    const modQuizzes = _.cloneDeep(quizzes);
    modQuizzes.forEach((quiz) => {
      quiz.attempted = false;
      const { options } = quiz;
      options.map((option) => (option.isSelected = false));
    });
    setLoadedQuiz(true);
    setQuizzes(modQuizzes);
    if (modQuizzes.length > 0) setGotQuiz(true);
  };

  useEffect(() => {
    initializeState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleQuizUpdate = (quizNumber, optionNumber, action) => {
    const modQuizzes = _.cloneDeep(quizzes);
    modQuizzes[quizNumber].attempted = true;
    modQuizzes[quizNumber].options.map((option) => (option.isSelected = false));
    modQuizzes[quizNumber].options[optionNumber].isSelected = action;
    setQuizzes(modQuizzes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = window.confirm("আপনি কুইজ জমা দেয়ার একটি সুযোগ পাবেন।");

    let minutes = localStorage.getItem(
      `totalTime_${user.regNumber}_${user.quizId}`
    );
    let seconds = localStorage.getItem(
      `seconds_${user.regNumber}_${user.quizId}`
    );

    res && (await submitQuiz(quizzes, quizTime, minutes, seconds));
    setLoading(false);
  };

  const handleForceSubmit = async () => {
    setLoading(true);
    await submitQuiz(quizzes);
    setLoading(false);
  };

  // Force submit quiz on time complete
  useEffect(() => {
    if (forceQuizSubmit) {
      handleForceSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceQuizSubmit]);

  return (
    <div className="container mx-auto">
      {/* Form */}
      {loadedQuiz && (
        <form onSubmit={handleSubmit}>
          <quizContext.Provider value={{ handleQuizUpdate }}>
            <div className="quiz-container grid xl:grid-cols-2 gap-4 mb-2">
              {quizzes.map((quiz, ind) => (
                <Question key={quiz.id} quiz={quiz} quizNumber={ind} />
              ))}
            </div>
            <div>
              <button
                type="submit"
                className="bg-gradient-to-tr mt-4 from-violet-700 to-indigo-800 text-white font-bold py-3 px-7 rounded-full disabled:from-slate-950 disabled:to-slate-800"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "জমা দিন"}
              </button>
            </div>
          </quizContext.Provider>
        </form>
      )}
    </div>
  );
}
