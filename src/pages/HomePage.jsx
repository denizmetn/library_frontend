import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const HomePage = () => {
  const images = [
    "/images/l.jpg",
    "/images/b1.jpg",
    "/images/p1.jpg",
    "/images/p2.jpg",
    "/images/l1.jpg",
    "/images/b2.jpg",
    "/images/p3.jpg",
    "/images/l2.jpg",
    "/images/b3.jpeg",
    "/images/p4.jpg",
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-gray-100 via-white to-gray-200 ">
      <header className="w-full justify-between bg-white flex shadow-md py-4 px-6 items-center">
        <h1 className="font-bold text-2xl text-gray-800">
          📚 KÜTÜPHANE SİSTEMİ
        </h1>
        <div className=" flex space-x-4">
          <Link to={"/login"}>
            <button className="border rounded-lg border-gray-300 text-gray-700 bg-white hover:bg-blue-100 transition py-2 px-4">
              Giriş Yap
            </button>
          </Link>
          <Link to={"/register"}>
            <button className="border rounded-lg border-gray-300 text-gray-700 bg-white hover:bg-green-100 transition py-2 px-4">
              Kayıt Ol
            </button>
          </Link>
        </div>
      </header>
      <main className="relative overflow-hidden flex-grow">
        <Swiper
          modules={[Navigation, A11y, Autoplay, EffectFade]}
          effect="fade"
          speed={1500}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-full"
        >
          {images.map((url, index) => (
            <SwiperSlide key={index} className="w-full h-full">
              <img src={url} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </div>
  );
};
export default HomePage;
