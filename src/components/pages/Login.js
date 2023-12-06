import { Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import MainContext from "../../contextApi/MainContext";

export default function Login() {
  const mainContext = useContext(MainContext);
  const { login } = mainContext;

  const [formData, setFormData] = useState({
    regNumber: "",
    phone: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(formData.regNumber, formData.phone, formData.name);
    setLoading(false);
  };

  return (
    <div className="py-16">
      <div className="bg-white p-8 rounded-md max-w-[768px] mx-auto text-justify shadow-md">
        <p className="mt-4">
          - <b>অনলাইন রেজিষ্ট্রেশন</b> যেসকল প্রতিযোগী অনলাইনে আমাদের ওয়েবসাইট
          <a
            href="https://ninish.com"
            className="font-semibold"
            rel="noreferrer"
            target="_blank"
          >
            {" "}
            ninish.com
          </a>{" "}
          ব্যাবহার করে রেজিষ্ট্রেশন করেছেন এবং ১০০টাকা রেজিষ্ট্রেশন ফি দিয়েছিলেন
          শুধু তাদের রেজিষ্ট্রেশন এপ্রুভ করা হয়েছে। আপনারা ওয়েবসাইটে 'একাউন্ট'
          অপশন এ যেয়ে আপনাদের ড্যাশবোর্ড থেকে রেজিষ্ট্রেশন আইডি পেয়ে যাবেন।
        </p>
      </div>
      <div className="form pt-20">
        <h1 className="text-4xl sm:text-5xl pb-3 text-center font-semibold">
          মুজিব অলিম্পিয়াড ২০২৩ - অন্যান্য জেলা পর্ব
        </h1>
        <p className="text-center text-lg text-red-500">
          ঢাকা, গাজীপুর ও খুলনা জেলা ব্যাতিত পরীক্ষার্থী অংশ নিতে পারবেন।
        </p>
        <form
          className="max-w-[768px] w-full px-2 mx-auto mt-8"
          onSubmit={handleSubmit}
        >
          <div className="pb-10">
            <label htmlFor="name">নামঃ (In English)</label>
            <input
              id="name"
              required
              placeholder="আপনার নাম লিখুন"
              type="text"
              className="rounded-md text-black mt-3 w-full border border-purple-300 p-3 bg-purple-100"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="pb-10">
            <label htmlFor="">রেজিস্ট্রেশন আইডি (In English)</label>
            <input
              id="regNumber"
              required
              placeholder="আপনার রেজিস্ট্রেশন নম্বরটি লিখুন"
              type="text"
              className="rounded-md text-black mt-3 w-full border border-purple-300 p-3 bg-purple-100"
              value={formData.regNumber}
              onChange={(e) =>
                setFormData({ ...formData, regNumber: e.target.value })
              }
            />
          </div>
          <div className="pb-10">
            <label htmlFor="">ফোন নম্বর (In English)</label>
            <div className="flex mt-2 justify-center md:justify-start">
              <div className="flex items-center px-2  bg-slate-200 border border-r-0 border-purple-300 rounded-l-md">
                <span className="mt-1 text-slate-500">+88</span>
              </div>
              <div className="w-full">
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  placeholder="01XXXXXXXXX"
                  className="p-2 rounded-r-md bg-purple-100 border border-purple-300 px-2 text-lg w-full"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="pb-10">
            <button
              type="submit"
              className="bg-gradient-to-tr from-violet-700 to-indigo-800 text-white font-bold py-3 px-7 rounded-full disabled:from-slate-950 disabled:to-slate-800"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "লগ ইন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
