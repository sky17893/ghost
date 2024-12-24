// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { symptom } from "../../constants/data";
import previc from "../../assets/previc.png";
import nextic from "../../assets/nextic.png";

import "swiper/css/navigation";
import "swiper/css/pagination";

// Import Swiper styles
import "swiper/css";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  // console.log(prevRef.current);
  return (
    <div className="box-wrapper w-full flex flex-col md:flex-row justify-between items-center p-2 md:p-4 bg-white border rounded-md">
      <div className="text-center w-full md:w-[20%]">
        <h3 className="text-base md:text-lg lg:text-xl font-semibold mt-2 md:mt-0">
          자주 나타나는 
          <br className="hidden md:block" />
          증상
        </h3>
      </div>
      <div className="relative w-full md:w-[80%]">
        <div className="flex gap-3 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute justify-between w-full">
          <button className="text-xl" ref={prevRef}>
            <img src={previc} alt="" className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button className="text-xl" ref={nextRef}>
            <img src={nextic} alt="" className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={4}
          breakpoints={{
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            0: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {symptom.map((item) => (
            <SwiperSlide
              key={item.id}
              className="rounded-lg overflow-hidden shadow-inner-lg"
            >
              <Link to={`/symptomdetail/${item.id}`} className="group">
                <div className="absolute opacity-30 overlay w-full h-full bg-black left-0 top-0 group-hover:bg-white"></div>
                <h5 className="absolute w-full text-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-semibold drop-shadow-md group-hover:text-black group-hover:drop-shadow-0">
                  {item.text}
                </h5>
                <img src={item.image} alt={item.text} />
              </Link>
            </SwiperSlide>
          ))}
          {/* <SwiperSlide>{symptom.image}</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
};
