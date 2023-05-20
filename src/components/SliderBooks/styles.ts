import styled from 'styled-components'

export const container = styled.article`
  padding: 0.7rem;
  background-color: #fff;
  height: 400px;
  display: flex;
  flex-direction: column;
  border: 1px solid #d9d9d9;
  border-radius: 7px;
  cursor: pointer;
  transition: 1s;
  img {
    border-radius: 7px !important;
    height: 250px;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
    .titleBook {
      text-align: center;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      z-index: 50;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 0.8125rem;
      color: var(--four-color);
      text-align: center;
    }
    #author {
      font-size: 0.7rem;
      color: gray;
    }
    button {
      width: 100%;
      padding: 0.5rem 0.2rem;
      border-radius: 7px;
      background-color: transparent;
      cursor: pointer;
      border: 2px solid var(--primary-color);
      transition: 1s;
      color: var(--primary-color);
      font-weight: bold;
      font-size: 0.875rem;
      text-align: center;
      margin-top: auto;

      @media (max-width: 640px) {
        font-size: 0.8rem;
      }
    }
  }

  &:hover {
    border: 1px solid var(--primary-color);
    .info {
      button {
        background-color: var(--primary-color);
        color: #fff;
      }
    }
  }
`
