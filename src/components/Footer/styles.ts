import styled from 'styled-components'

export const footer = styled.footer`
  background-color: var(--primary-color);
  color: #fff;

  .containerFooter {
    padding-block: 2rem;
    max-width: 1220px;
    height: 100%;
    padding-inline: 1rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      gap: 0.2rem;
      align-items: center;
    }

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`
