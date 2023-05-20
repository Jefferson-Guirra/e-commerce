import styled from 'styled-components'

export const container = styled.article`
  padding: 0.7rem;

  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  border-radius: 7px;
  background-color: #eee;
  cursor: pointer;
  transition: 1s;

  img {
    border-radius: 12px !important;
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
      color: #363636c2;
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
    border: 1px solid #d9d9d9;
    -webkit-box-shadow: 0px 0px 5px 1px rgba(217, 217, 217, 1);
    -moz-box-shadow: 0px 0px 5px 1px rgba(217, 217, 217, 1);
    box-shadow: 0px 0px 5px 1px rgba(217, 217, 217, 1);
    .info {
      button {
        background-color: var(--primary-color);
        color: #fff;
      }
    }
  }
`
