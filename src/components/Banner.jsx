"use client"

import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"


import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

export default function Banner() {
  const slides = [
    {
      title: "Transform Your Raw Concepts into Global Innovations.",
      desc: "NextGen Catalyst: The dynamic platform for entrepreneurs to share, refine, and connect custom startup strategies.",
      
      image: "/asests/img3.jpg"
    },
    {
      title: "Find the Right Audience & Seed Funding Context",
      desc: "Pitch your requirements directly to top global venture capital firms and strategic industry mentors.",
      
      image: "/asests/img2.jpg"
    },
    {
      title: "Co-Build With Verified Tech Pioneers",
      desc: "Post existing workflow difficulties, find qualified technical co-founders, and expand asset groups.",
      
      image: "/asests/img1.jpg"
    }
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
     
      <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-slate-200/10 dark:border-slate-800/20 relative">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
         
          className="h-[380px] sm:h-[440px] md:h-[500px] w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              
              <div 
                className="w-full h-full bg-cover bg-center flex flex-col justify-center items-center text-center relative"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                
               
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/70 to-slate-950/50 pointer-events-none" />

              
                <div className="relative z-10 max-w-4xl px-4 sm:px-8 md:px-16 space-y-4 sm:space-y-6">
                  
                 
                  <h1 className="text-xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-snug sm:leading-tight max-w-3xl mx-auto">
                    {slide.title}
                  </h1>
                  
                  
                  <p className="text-slate-200 dark:text-slate-300 text-[11px] sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-normal px-2 sm:px-0">
                    {slide.desc}
                  </p>
                  
                  
                  <div className="pt-2">
                    <Link 
                      href="/ideas" 
                      className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-300 rounded-lg sm:rounded-xl transition-all shadow-lg shadow-indigo-600/30 active:scale-95"
                    >
                      Explore Ideas &rarr;
                    </Link>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}