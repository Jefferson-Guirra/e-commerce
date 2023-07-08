import Image from 'next/image'
import styles from './styles.module.css'
export const PresentationCover = () => {
  return (
    <article className={styles.container}>
      <Image
        src={'/images/presentation-cover.jpg'}
        quality={100}
        width={1200}
        height={0}
        style={{ width: '100%', height: '100%' }}
        alt="presentation image"
      />
    </article>
  )
}
