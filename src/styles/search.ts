import styled from "styled-components"
export const container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1rem;
  .containerBook {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    @media (max-width: 900px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 550px) {
      grid-template-columns: 1fr;
    }
  }

  .contentBook {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    justify-content: center;
    align-items: center;
    .cardBook {
      position: relative;
      cursor:pointer;
      transition:1s;
      width: 100%;
      display: flex;
      font-size: 1rem;
      flex-direction: column;
      gap: 0.5rem;
      color: #363636;
      border: 1px solid #d9d9d9;
      align-items: center;
      background-color: #fff;
      padding: 2rem;
      border-radius: 7px;
      .text {
        text-align: center;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        z-index: 50;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      img {
        height: 400px;
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
        font-size: 1rem;
        text-align: center;
        transition: 1s;
      }
      &:hover {
        border:1px solid var(--primary-color);
        button{
          background-color: var(--primary-color) !important;
          color: #fff;
        }
      }
    }
  }
` 