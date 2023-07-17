import { Swiper, SwiperProps } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper'

import { ReactNode } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Props {
  children?: ReactNode
  settings: SwiperProps
}
export function Slider({ children, settings }: Props) {
  return (
    <Swiper modules={[Navigation, Pagination, Autoplay]} {...settings}>
      {children}
    </Swiper>
  )
}
