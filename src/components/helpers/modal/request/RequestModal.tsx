import { ReactNode } from 'react'
import { HttpResponse } from '../../../../@types/request/http'
import styles from './styles.module.css'
import { HtmlProps } from 'next/dist/shared/lib/html-context'

type Status = '200' | '401' | '500'

interface Props extends React.HTMLProps<HTMLDivElement> {
  httpResponse: HttpResponse
  children: ReactNode
}

export const RequestModal = ({
  httpResponse,
  children,
  className,
  ...rest
}: Props) => {
  const handleMessage = (response: HttpResponse): string => {
    const message = {
      '200': `<p> Email enviado para:</p> <p>${response.body?.email}</p>`,
      '401': '<p>Usuário não cadastrado.</p>',
      '500': '<p>Erro interno no servidor.<p>',
    }
    const statusCode = httpResponse.statusCode.toString() as Status
    return message[statusCode]
  }
  return (
    <section className={`${styles.container} ${className}`} {...rest}>
      <section className={styles.content}>
        {children}
        <article
          dangerouslySetInnerHTML={{ __html: handleMessage(httpResponse) }}
        ></article>
      </section>
    </section>
  )
}
