import { Loader2, ThumbsUp } from "lucide-react";
import React, { useContext, useState } from "react";
import MainContext from "../../../contextApi/MainContext";
import img from "../../../images/certificate.png";

export default function Download() {
  const mainContext = useContext(MainContext);
  const { user } = mainContext;

  const [text, setText] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const show = () => {
    setLoading(true);
    setInterval(() => {
      setText(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="justify-center flex certificate-container">
      <div>
        {/* Print Image */}
        <div className="w-full hidden mt-10 relative img-container print:block print:h-[90vh] print:w-screen">
          <img src={img} alt="certificate" className="certificate" />
        </div>
        {/* Dummy */}
        <div className="max-w-[900px] w-full mt-10 relative img-container no-print">
          <img src={img} alt="certificate" className="certificate" />
        </div>
        <div className="flex justify-center my-10 no-print">
          <a href={`${baseUrl}/downloadCertificate/${user.regNumber}`} download>
            <button className="inline-block bg-gradient-to-tr  from-violet-700 to-indigo-800 text-white font-bold py-3 px-7 rounded-full">
              ভাউনলোড করুন
            </button>
          </a>
        </div>
        <div className="flex justify-center">
          <div className="no-print">
            <button
              id="btn"
              className={`inline-block bg-gradient-to-tr mb-8 from-violet-700 to-indigo-800 text-white font-bold py-3 px-7 rounded-full ${
                text ? "hidden" : "block"
              }`}
              onClick={show}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  {" "}
                  বৃত্তি এর জন্য আবেদন করতে
                  <br />
                  এখানে ক্লিক করুন
                </>
              )}
            </button>
            <div
              className={`py-5 flex items-center gap-2 md:gap-4 text-white font-semibold mb-20 px-2 text-center md:text-start md:px-20 rounded-lg bg-green-700 ${
                text ? "block" : "hidden"
              }`}
            >
              <p className="mt-2">আপনি সফল ভাবে বৃত্তির জন্য আবেদন করেছেন</p>
              <ThumbsUp className="hidden md:block" size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
