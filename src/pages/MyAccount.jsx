import React from "react";
const MyAccount = () => {
  return (
    <div className=" flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-2xl text-gray-700">Ad Soyad</h2>
        <div className="border border-gray-300 bg-white rounded-lg shadow-sm w-1/4 h-10 flex items-center px-4">
          Tuna Bozlak
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-2xl text-gray-700">E-posta</h2>
        <div className="border border-gray-300 bg-white rounded-lg shadow-sm w-1/4 h-10 flex items-center px-4">
          a@gmail.com
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-2xl text-gray-700">Şifre Değiştir</h2>
        <button className="w-1/4 h-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300 shadow-md">
          Şifre Değiştir
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
