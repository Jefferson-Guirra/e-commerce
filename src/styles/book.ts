import styled from "styled-components";

export const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1rem;

  .aboutBook {
    display: flex;
    gap: 1rem;

    .contentBook {
      display: flex;
      gap: 2rem;
      width:100%;
      .infoBook {
        display: flex;
        flex-shrink:0;
        gap: 1rem;
        width: 70%;
        img {
          height: 400px;
          width: 200px;
        }
        .textBook {
          display: flex;
          flex-direction: column;
          font-size: 1rem;
          gap: 1rem;

          .itemText {
            display: flex;
            align-items: center;
            gap: 0.2rem;
          }
          #list {
            cursor: pointer;
          }
          .description {
            text-align: justify;
            line-height: 150%;
            font-size: 0.8rem;
          }
        }
      }
    }
  }
  @media (max-width: 1200px) {
    .contentBook {
      flex-direction: column;
      .infoBook {
        width: 100% !important;
      }
    }
  }

  @media (max-width: 650px) {
    .aboutBook {
      .contentBook {
        .infoBook {
          flex-direction: column;
          img {
            margin: 0 auto;
            width: 50%;
          }
          .textBook {
            font-size: 1rem;
            h2 {
              text-align: center;
            }
            #subTitle{
              text-align:center;
            }
          }
        }
      }
    }
  }
`

export const buyContainer = styled.section`
  width: 50%;
  background-color: #f7f7f7;
  border: 1px solid #d9d9d9;
  border-radius: 7px;
  height:fit-content;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .alert {
    background-color: var(--primary-color);
    width: fit-content;
    color: #fff;
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
    border-radius: 15px;
  }

  .infoBuy {
    display: flex;
    gap: 1rem;
    img {
      width: 30%;
    }

    .textBuy {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 1rem;
      h2 {
        font-size: 1rem;
      }
      .itemBuy {
        display: flex;
        align-items: center;
        gap: 0.2rem;
        font-size: 0.9rem;
        p {
          font-weight: bold;
        }
      }
    }
  }
  .actionsBuy {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    p {
      text-align: center;
    }
    button {
      width: 100%;
      padding-block: 0.7rem;
      border-radius: 15px;
      transition:1s;
      &:hover{
        background-color:var(--primary-color) !important;
        color:#fff;
      }
    }
  }
  @media (max-width:1200px){
    width:100%;
    .infoBuy{

    }
  }
`

export const resultBooks = styled.section`
  margin-top:5rem;
`