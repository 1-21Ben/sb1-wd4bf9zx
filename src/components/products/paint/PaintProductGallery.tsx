import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface PaintProductGalleryProps {
  images: Array<{
    url: string;
    alt: string;
  }>;
}

export function PaintProductGallery({ images }: PaintProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="space-y-4">
      <Swiper
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        className="aspect-square rounded-lg overflow-hidden"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
        <button className="swiper-button-prev !w-10 !h-10 !bg-white/90 !rounded-full !backdrop-blur-sm">
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>
        <button className="swiper-button-next !w-10 !h-10 !bg-white/90 !rounded-full !backdrop-blur-sm">
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </button>
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        modules={[Thumbs]}
        className="h-24"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}