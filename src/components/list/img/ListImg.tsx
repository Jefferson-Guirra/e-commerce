import Image from 'next/image'
interface Props {
  src: string
  alt: string
}
const ListImg = (props: Props) => {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      quality={100}
      height={0}
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NTXfDgACogFakP/skwAAAABJRU5ErkJggg=="
      style={{ width: '100%', height: 'auto', borderRadius: '0px' }}
      width={100}
    />
  )
}

export default ListImg
