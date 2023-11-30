import React, { useContext, useEffect, useState } from "react";
import MainContext from "../../../../contextApi/MainContext";
import Counter from "../../Counter";
import Quiz from "./Quiz";

export default function QuizLayout() {
  const { user } = useContext(MainContext);
  const { regNumber, quizId } = user;

  const [totalTime, setTotalTime] = useState(
    Number(quizId) === 1
      ? 20
      : Number(quizId) === 2
      ? 25
      : Number(quizId) === 3
      ? 30
      : Number(quizId) === 4
      ? 40
      : 35
  );
  const [seconds, setSeconds] = useState(0);
  const [ready, setReady] = useState(false);
  const [gotQuiz, setGotQuiz] = useState(false);
  const [forceQuizSubmit, setForceQuizSubmit] = useState(false);

  useEffect(() => {
    if (regNumber !== undefined) {
      setReady(false);
      if (localStorage.getItem(`totalTime_${regNumber}_${quizId}`)) {
        setTotalTime(localStorage.getItem(`totalTime_${regNumber}_${quizId}`));
      }
      if (localStorage.getItem(`seconds_${regNumber}_${quizId}`)) {
        setSeconds(localStorage.getItem(`seconds_${regNumber}_${quizId}`));
      }
      setReady(true);
    }
  }, [quizId, regNumber]);

  let timeLeft = new Date();

  // add a day
  timeLeft.setMinutes(timeLeft.getMinutes() + Number(totalTime));
  timeLeft.setSeconds(timeLeft.getSeconds() + Number(seconds));

  const quizTime =
    Number(quizId) === 1
      ? 20
      : Number(quizId) === 2
      ? 25
      : Number(quizId) === 3
      ? 30
      : Number(quizId) === 4
      ? 40
      : 35;

  return (
    <div className="container mx-auto py-4">
      {/* Quiz Header */}
      <div className="text-center mb-4">
        <h3 className="text-3xl py-3 text-center font-semibold">
          মুজিব অলিম্পিয়াড ২০২৩ - ঢাকা পর্ব
        </h3>
        <p className="mb-2 font-bold text-lg">
          {Number(quizId) === 1
            ? "প্রাথমিক(৩য়,৪র্থ,৫ম)"
            : Number(quizId) === 2
            ? "নিম্ন মাধ্যমিক(৬ষ্ঠ,৭ম,৮ম)"
            : Number(quizId) === 3
            ? "মাধ্যমিক(৯ম ও ১০ম)"
            : Number(quizId) === 4
            ? "উচ্চ মাধ্যমিক(১১শ ও ১২শ)"
            : "বিশ্ববিদ্যালয়"}
        </p>
        <p className="flex justify-center gap-4 text-lg">
          <span>
            মোট প্রশ্নঃ{" "}
            {Number(quizId) === 1
              ? 30
              : Number(quizId) === 2
              ? 40
              : Number(quizId) === 3
              ? 50
              : Number(quizId) === 3
              ? 60
              : 60}{" "}
            টি
          </span>
          <span>মোট সময়ঃ {quizTime} মিনিট</span>
        </p>
        <div className="mt-2 font-semibold text-xl">
          অবশিষ্ট সময়ঃ
          {/* Time Counter */}
          {ready && gotQuiz && (
            <Counter
              deadline={timeLeft}
              totalTime={totalTime}
              quizId={quizId}
              setForceQuizSubmit={setForceQuizSubmit}
              regNum={user.regNumber}
            />
          )}
        </div>
      </div>
      {/* Form */}
      <Quiz
        setGotQuiz={setGotQuiz}
        id={quizId}
        forceQuizSubmit={forceQuizSubmit}
        quizTime={quizTime}
      />
    </div>
  );
}
