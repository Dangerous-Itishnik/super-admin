
import Image from 'next/image'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

 
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import styles from './SwiperSlider.module.scss'
import {ImagePost} from "@/generated/graphql";

type Props = {
  imagesUrl: ImagePost[]
}

export const SwiperSlider = ({ imagesUrl}: Props) => {
  return (
    <Swiper
      className={styles.postSlider}
      modules={[Navigation, Pagination, Scrollbar]}
      navigation
      pagination={{ clickable: true }}
      slidesPerView={1}
      spaceBetween={10}
      style={{ height: '100%', position: 'relative', width: '100%' }}
    >
      {imagesUrl?.map((image, index: number) => {
        if (!image.url) {
          return null
        }

        return (
          <SwiperSlide
            className={styles.img}
            key={index}
            style={{ position: 'relative' }}
          >
            <Image
              alt={`Image ${index}`}
              fill
              priority
              sizes={"234px"}
              src={image.url || ''}
              style={{ height: '100%', objectFit: 'contain', width: '100%' }}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
