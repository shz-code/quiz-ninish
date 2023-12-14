import React, { useState } from "react";

const baseUrl = process.env.REACT_APP_BASE_URL;

export default function Login() {
  const [formData, setFormData] = useState({
    regNumber: "",
    phone: "",
    name: "",
  });

  return (
    <div className="py-16">
      <div className="form pt-20">
        <h1 className="text-4xl sm:text-5xl pb-3 text-center font-semibold">
          সার্টিফিকেট ডাউনলোড (Mujib Olympiad Outside Dhaka)
        </h1>
        <form className="max-w-[768px] w-full px-2 mx-auto mt-8">
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
          <div className="pb-10 flex justify-center">
            <a
              href={`${baseUrl}/downloadCertificateV2/?regNumber=${formData.regNumber}&name=${formData.name}`}
              className="bg-gradient-to-tr from-violet-700 to-indigo-800 text-white font-bold py-3 px-7 rounded-full disabled:from-slate-950 disabled:to-slate-800 w-fit mx-auto"
            >
              ডাউনলোড
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
