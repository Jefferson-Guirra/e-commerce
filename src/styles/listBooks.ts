import styled from "styled-components";

export const container = styled.main`
  min-height: calc(100vh - 103px);

  .content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 5rem 1rem;
    gap: 2rem;

    .title {
      grid-column: 1/-1;
    }
  }
`
export const contentBooks = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: center;
  gap: 2rem;

  .cardBooks {
    width: 100%;
    padding: 1rem;
    border: 1px solid #d9d9d9;
    border-radius: 7px;
    background-color: #fff;

    img {
      height: 250px;
    }
    .info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: red;
      font-size: 0.8125rem;
      text-align: center;
      color: var(--four-color);

      .titleBook {
        text-align: center;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        z-index: 50;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      #author {
        font-size: 0.7rem;
        color: gray;
      }
    }
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 450px) {
    grid-template-columns: 1fr;
    .cardBooks{
      padding:2rem;

      img{
        height:350px;
      }
    }
  }
`


