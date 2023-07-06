import Image from 'next/image'
import styles from './styles.module.css'
interface Props {
  src: string
  alt: string
}
export const ListImg = (props: Props) => {
  return (
    <div className={styles.container}>
      <Image
        src={props.src}
        alt={props.alt}
        quality={100}
        height={0}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NTXfDgACogFakP/skwAAAABJRU5ErkJggg=="
        style={{ height: '180px', borderRadius: '0px' }}
        width={100}
      />
    </div>
  )
}
