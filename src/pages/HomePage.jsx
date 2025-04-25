import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const HomePage = () => {
  const images = ["src/images/books.jpg", "src/images/library.jpg"];

  return (
    <div className="justify-center h-screen w-full overflow-hidden flex flex-col">
      <div className="w-screen h-3/20 bg-gray-300 flex">
        <h1 className="font-bold text-3xl text-black p-10 flex items-center">
          KÜTÜPHANE SİSTEMİ
        </h1>
        <div className=" flex items-center p-10 space-x-4 ml-auto">
          <button className="border rounded-lg border-black text-black bg-white hover:bg-blue-300 font-bold py-2 px-4">
            Giriş Yap
          </button>
          <button className="border rounded-lg border-black text-black bg-white hover:bg-blue-300 font-bold py-2 px-4">
            Kayıt Ol
          </button>
        </div>
      </div>
      <div className="w-screen h-17/20 bg-gray-200 relative overflow-hidden">
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
            <SwiperSlide key={index} className="relative w-full h-full">
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default HomePage;
