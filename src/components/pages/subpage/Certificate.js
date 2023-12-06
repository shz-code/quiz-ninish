import { BadgeCheck } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Certificate() {
  return (
    <div className="flex justify-center py-20">
      <div className=" w-full text-center container ">
        <div>
          {" "}
          <div className="flex justify-center">
            <BadgeCheck className="text-green-500 mb-4" size={60} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold pb-10 mt-2">
            আপনি সফল ভাবে পরীক্ষা দিয়েছেন !
          </h1>
          <p className="pb-10 font-semibold text-xl">
            বিজয়ীদের ফলাফল এবং যাবতীয় বিস্তারিত বিষয়াদি ৯ ডিসেম্বর দুপুর ১২
            ঘটিকায় ওয়েবসাইট এবং ফেইসবুক পেইজে প্রকাশ করা হবে।
          </p>
          <p className="pb-10 text-lg">
            আপনার সার্টিফিকেট নিতে নিচের বাটন এ ক্লিক করুন{" "}
          </p>
          <Link
            to="/download"
            className="inline-block bg-gradient-to-tr  from-violet-700 to-indigo-800 text-white font-bold py-3 px-7 rounded-full"
          >
            পরবর্তী
          </Link>
        </div>
      </div>
    </div>
  );
}
