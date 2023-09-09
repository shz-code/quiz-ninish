import React, { useContext, useState } from "react";
import quizContext from "../../../../contextApi/QuizContext";

export default function QuizOption({ option, ind, quizNumber }) {
  const [selected, setSelected] = useState(false);
  const { title } = option;
  const { handleQuizUpdate } = useContext(quizContext);

  const handleChange = (e) => {
    setSelected((prev) => !prev);
    handleQuizUpdate(quizNumber, ind, !selected);
  };

  return (
    <div className="quizOption">
      <label
        htmlFor={`ck_${ind}_${quizNumber}`}
        className={`cursor-pointer w-full text-white  rounded-md px-4 py-2
        flex items-center gap-2 ${
          selected ? "bg-violet-900" : "bg-violet-600 hover:bg-purple-800"
        }`}
        tabIndex="0"
        aria-label={title}
      >
        <input
          type="radio"
          className="w-6 h-6"
          id={`ck_${ind}_${quizNumber}`}
          defaultChecked={selected}
          name={quizNumber}
          onChange={handleChange}
        />
        {title}
      </label>
    </div>
  );
}
