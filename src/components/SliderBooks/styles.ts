import styled from "styled-components";

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
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    p {
      font-size: 0.8125rem;
      color: #363636;
      text-align: center;
    }
    #author {
      font-size: 0.7rem;
      color: gray;
    }
    button {
      width: 100%;
      padding: 0.5rem;
      border-radius: 7px;
      background-color: transparent;
      cursor: pointer;
      border: 2px solid var(--primary-color);
      transition: 1s;
      color: var(--primary-color);
      font-weight: bold;
      font-size: 0.875rem;
      text-align: center;
      @media (max-width: 650px) {
        font-size: 0.8rem;
      }
      @media (max-width: 565px) {
        font-size: 0.7rem;
      }
      @media (max-width: 525px) {
        font-size: 0.81rem;
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