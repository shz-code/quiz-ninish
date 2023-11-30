import { Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import MainContext from "../../contextApi/MainContext";

export default function NewReg() {
  const mainContext = useContext(MainContext);
  const { modifyUser } = mainContext;

  const [formData, setFormData] = useState({
    name: "",
    cls: "",
    institute: "",
    quizCategory: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.quizCategory === "") {
      toast.error("কুইজ ক্যাটাগরি নির্বাচন করুন।");
    } else {
      modifyUser(
        formData.name,
        formData.cls,
        formData.institute,
        "Dhaka",
        formData.quizCategory
      );
    }

    setLoading(false);
  };

  return (
    <div className="py-16">
      <div className="form pt-20">
        <h1 className="text-4xl sm:text-5xl pb-3 text-center font-semibold">
          মুজিব অলিম্পিয়াড ২০২৩ - ঢাকা জেলা পর্ব
        </h1>
        {/* Form */}
        <form
          className="max-w-[768px] mx-auto w-full px-2 mt-8"
          onSubmit={handleSubmit}
        >
          <div className="pb-10">
            {/* Name */}
            <label htmlFor="name">নামঃ</label>
            <input
              id="name"
              required
              placeholder="আপনার নাম"
              type="text"
              className="rounded-md text-black mt-3 w-full border border-purple-300 p-3 bg-purple-100"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <p className="mt-2 font-semibold text-red-600">
              এখানে প্রদত্ত নামই সার্টিফিকেটের জন্য ব্যাবহার করা হবে। একবার জমা
              দিলে তা আর পরিবর্তনযোগ্য নয়।
            </p>
          </div>
          {/* Class */}
          <div className="pb-10">
            <label htmlFor="cls">শ্রেণিঃ</label>
            <input
              id="cls"
              required
              placeholder="আপনার শ্রেণি"
              type="text"
              className="rounded-md text-black mt-3 w-full border border-purple-300 p-3 bg-purple-100"
              value={formData.cls}
              onChange={(e) =>
                setFormData({ ...formData, cls: e.target.value })
              }
            />
          </div>
          {/* Institute */}
          <div className="pb-10">
            <label htmlFor="institute">শিক্ষা প্রতিষ্ঠানঃ</label>
            <input
              id="institute"
              required
              placeholder="আপনার শিক্ষা প্রতিষ্ঠান"
              type="text"
              className="rounded-md text-black mt-3 w-full border border-purple-300 p-3 bg-purple-100"
              value={formData.institute}
              onChange={(e) =>
                setFormData({ ...formData, institute: e.target.value })
              }
            />
          </div>
          {/* District */}
          <div className="pb-10">
            <label htmlFor="district">জেলাঃ</label>
            <input
              id="district"
              required
              placeholder="আপনার জেলা"
              type="text"
              className="rounded-md text-black mt-3 w-full border border-purple-300 p-3 bg-purple-100 disabled:bg-slate-400"
              defaultValue={"ঢাকা"}
              disabled
            />
          </div>
          {/* Quiz Category */}
          <div className="pb-10">
            <label htmlFor="quizCategory">কুইজ ক্যাটাগরি নির্বাচন করুনঃ</label>
            <select
              id="quizCategory"
              required
              placeholder="Enter your registration number"
              type="text"
              className="rounded-md text-black mt-3 w-full border border-purple-300 p-3 bg-purple-100"
              value={formData.quizCategory}
              onChange={(e) =>
                setFormData({ ...formData, quizCategory: e.target.value })
              }
            >
              <option hidden>নির্বাচন করুন</option>
              <option value="1">প্রাথমিক (৩য়, ৪র্থ ও ৫ম)</option>
              <option value="2">নিম্ন মাধ্যমিক (৬ষ্ঠ, ৭ম ও ৮ম)</option>
              <option value="3">মাধ্যমিক (৯ম ও ১০ম)</option>
              <option value="4">উচ্চ মাধ্যমিক (১১শ ও ১২শ)</option>
              <option value="5">বিশ্ববিদ্যালয়</option>
            </select>
          </div>
          {/* Button */}
          <div className="pb-10 flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-tr from-violet-700 to-indigo-800 text-white font-bold py-3 px-7 rounded-full disabled:from-slate-950 disabled:to-slate-800"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "পরবর্তী"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
