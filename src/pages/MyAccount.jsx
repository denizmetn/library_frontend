import React, { useState, useEffect } from "react";
import { Input } from "antd";
const { TextArea } = Input;
const MyAccount = () => {
  const [address, setAddress] = useState("");
  const [savedAddress, setSavedAddress] = useState("");

  useEffect(() => {
    const storedAddress = localStorage.getItem("savedAddress");
    if (storedAddress) {
      setSavedAddress(storedAddress);
      setAddress(storedAddress);
    }
  }, []);

  const handleSave = () => {
    setSavedAddress(address);
    localStorage.setItem("savedAddress", address);
  };

  return (
    <div className=" flex flex-col gap-8 ">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold ">Ad Soyad</h1>
        <div className="border border-gray-300 bg-white rounded-lg shadow-sm w-1/4 h-10 flex items-center px-4">
          Tuna Bozlak
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold ">E-Posta</h1>
        <div className="border border-gray-300 bg-white rounded-lg shadow-sm w-1/4 h-10 flex items-center px-4">
          a@gmail.com
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold ">Adres</h1>
        <TextArea
          placeholder="Adres giriniz:"
          style={{ width: "25%" }}
          rows={2}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-1/4 h-10 shadow-md hover:bg-blue-600"
          onClick={handleSave}
        >
          Kaydet
        </button>
      </div>
      <div className="mt-8 flex flex-col gap-2 text-gray-600 text-lg">
        <div>
          📚 Ödünç alınan kitap sayısı: <span className="font-semibold">2</span>
        </div>
        <div>
          ⏰ İade süresi geçmiş kitap sayısı:{" "}
          <span className="font-semibold text-red-500">1</span>
        </div>
      </div>
    </div>
  );
};
export default MyAccount;
