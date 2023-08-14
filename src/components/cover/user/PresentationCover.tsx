import Image from 'next/image'
import styles from './styles.module.css'
interface Props {
  url: string
}
export const PresentationCover = ({ url }: Props) => {
  return (
    <article className={styles.container}>
      <Image
        src={url}
        quality={100}
        width={1200}
        height={0}
        priority
        style={{ width: '100%', height: '100%' }}
        alt="presentation image"
      />
    </article>
  )
}
