import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";

import "./carousel_styles.css";

import StrayBanner from "../../assets/images/stray_banner.jpg";
import CyberpunkBanner from "../../assets/images/cyberpunk_banner.jpg";
import HorizonZeroBanner from "../../assets/images/horizon_zero_banner.jpg";

export default function Carousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      loop={true}
    >
      <SwiperSlide>
        <img src={CyberpunkBanner} alt=""></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={StrayBanner} alt=""></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={HorizonZeroBanner} alt=""></img>
      </SwiperSlide>
    </Swiper>
  );
}
