import { Swiper,SwiperProps } from 'swiper/react'
import { Pagination,Navigation } from "swiper";

import {ReactNode} from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
interface Props {
  children?: ReactNode;
  settings: SwiperProps;
}
export default function Slider({ children, settings }:Props) {
  return <Swiper modules={[Pagination,Navigation]} {...settings}>{children}</Swiper>
}
