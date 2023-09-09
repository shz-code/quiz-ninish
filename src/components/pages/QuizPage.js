import { Loader2 } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MainContext from "../../contextApi/MainContext";
import useQuizList from "../../hooks/useQuiz";
import Rules from "./subpage/Rules";

export default function QuizPage() {
  const mainContext = useContext(MainContext);
  const { user } = mainContext;

  const { quizList, isLoading, isError, quizOpen } = useQuizList(user.quizId);

  let content = null;

  if (isLoading) {
    content = (
      <div className="text-center py-16">
        <Loader2 className="animate-spin mx-auto" size={48} />
      </div>
    );
  } else if (!isLoading && !isError && !quizOpen) {
    content = (
      <div className="py-16">
        <div className="bg-white px-4">
          <div className="py-8">
            <h3 className="text-3xl font-semibold">অনলাইন কুইজ বিষয়ক তথ্যঃ</h3>
            <div className="text-lg grid gap-2 mt-2">
              <p>
                মুজিব অলিম্পিয়াড ২০২৩ - ঢাকা জেলা পর্বের কুইজ আগামী{" "}
                <span className="font-semibold text-2xl bg-green-300 px-2 rounded-md">
                  ১৩ই অক্টোবর(সকাল ৯ টা - দুপুর ১ টা)
                </span>
              </p>
              <p>
                কুইজ এর বিষয়ঃ{" "}
                <span className="text-slate-700 font-semibold">
                  বঙ্গবন্ধু, মুক্তিযুদ্ধ এবং স্মার্ট বাংলাদেশ
                </span>
              </p>
              <p>
                বিস্তারিত জানতে{" "}
                <a
                  href="https://ninish.com/mujibOlympiad23.php"
                  className="underline"
                >
                  এখানে ক্লিক করুন
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (!isLoading && !isError && quizOpen && quizList.length) {
    content = (
      <div className="py-16">
        <Rules />
        <Link
          to="/mujib-olympiad-dhaka-23"
          className="inline-block bg-gradient-to-tr  from-violet-700 to-indigo-800 text-white font-bold py-3 px-7 rounded-full mt-8"
        >
          কুইজ শুরু করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16">
      <h1 className="text-4xl sm:text-5xl pb-3 text-center font-semibold">
        মুজিব অলিম্পিয়াড ২০২৩ - ঢাকা জেলা পর্ব
      </h1>
      {content}
    </div>
  );
}
