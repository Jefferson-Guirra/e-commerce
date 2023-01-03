import styled from "styled-components";

export const container = styled.main`
  max-width: 1200px;
  position:relative;
  margin: 0 auto;
  padding: 5rem 1rem;
  min-height: calc(100vh - 103px);
  color: var(--four-color);

  .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .price {
    border-radius: 7px;
    margin-block: 2rem;
    padding: 1.5rem 1rem;
    border: 1px solid #d9d9d9;
    box-shadow: 0px 0px 5px 1px rgba(217, 217, 217, 0.57);
    -webkit-box-shadow: 0px 0px 5px 1px rgba(217, 217, 217, 0.57);
    text-align: right;
    gap: 1rem;
    -moz-box-shadow: 0px 0px 5px 1px rgba(217, 217, 217, 0.57);

    @media (max-width:530px){
      text-align:center;
    }
  }
  .checkout {
    display: flex;
    gap: 3rem;
    justify-content: flex-end;
    gap: 2rem;
    button {
      width: fit-content;
      font-family: 'Lato', sans-serif;
      padding: 0.8rem 1.5rem;
      text-align: center;
      font-size: 1.1rem;
      color: #fff;
      border-radius: 7px;
    }

    #addButton {
      border: 1px solid #d9d9d9;
      background-color: #fff;

      color: var(--four-color);
    }
    #buyButton {
      background-color: #f31;
    }
    @media (max-width:530px){
      flex-direction:column;
      align-items:center;
      justify-content:center;

      #addButton{
        order:1;
      }
      buyButton{
        order:0;
      }
    }
  }
`

export const cardContent = styled.section`
  background-color: #f4f4f4;
  border: 1px solid #d9d9d9;
  border-radius: 7px;
  overflow: hidden;
  box-shadow: 0px 0px 5px 1px rgba(217, 217, 217, 0.57);
  -webkit-box-shadow: 0px 0px 5px 1px rgba(217, 217, 217, 0.57);
  -moz-box-shadow: 0px 0px 5px 1px rgba(217, 217, 217, 0.57);

  h2 {
    padding: 0.5rem 1rem;
    color: var(--four-color);
    font-size: 1.1rem;
    border-bottom: 1px solid #d9d9d9;
  }

  .infoBook {
    padding: 1rem;
    display: flex;
    font-size: 1rem;
    border-bottom: 1px solid #d9d9d9;
    background-color: #fff;
    gap: 1rem;

    .img {
      img {
        margin: 0 auto;
        border-radius: 0px;
        width: 100px;
        height: 100px;
      }
      &::after {
        content: 'capa ilustrativa';
        display: block;
        font-size: 0.875rem;
        color: gray;
        text-align: center;
      }
    }
    .dataBook {
      width: 100%;
      display: flex;
      gap: 0.5rem;
      flex-direction: column;

      .header {
        display: flex;
        justify-content: space-between;
        height: 1rem;
        align-items: flex-end;
        .bookTitle {
          width: 30%;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          z-index: 50;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .actions {
          display: flex;
          flex: 1;
          align-items: flex-end;
          justify-content: flex-end;
          gap: 20%;
          position: relative;
          height: 1rem;
          .qtd {
            display:flex;
            align-items:center;
            border: 1px solid #d9d9d9;
            overflow:hidden;
            justify-content: space-between;
            background-color:#fff;
            border-radius:12px;
            cursor:inherit;
            transition: 1s;
            p{
              padding-inline:0.5rem;
            }
            svg{
              cursor:pointer;
              background-color:#f4f4f4;
            }

            &:hover {
              color: var(--four-color);
            }
          }

          .btnExclude {
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 1s;
            position: relative;
            top: 6px;

            svg {
              transition: 0.5s;
            }

            &:hover {
              background-color: #f31;

              svg {
                fill: #fff;
              }
            }
          }
        }
      }
      .textInfo {
        font-weight: bold;
        display: flex;
        gap: 0.2rem;
        span {
          font-weight: normal;
        }
      }
    }
  }

  @media (max-width: 810px) {
    .infoBook {
      flex-direction:column;
      .img {
        margin:0 auto;
      }

      .dataBook {
        gap:1rem;
        .header {
          height: fit-content;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          .bookTitle {
            order:1;
            width: 100%;
          }

          .actions {
            order:0;
            margin-bottom:1rem;
            width: 100%;
            justify-content: flex-start;

            a {
              padding: 0;
            }
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    .dataBook {
      .header {
          .actions {
            gap: 0rem !important;
            justify-content: space-between !important;
          }
        }
      }
    }
  }
`

export const buyInfoCard = styled.article`
  border-left: 4px solid var(--four-color);
  padding: 0.5rem;
  font-size: 1rem;
  h2 {
    padding: 0;
    border: none;
  }

  .infoBuy {
    display: flex;
    gap: 0.2rem;
    margin-block:0.5rem;

    span {
      font-weight: bold;
    }

    @media (max-width:500px){
      flex-wrap:wrap;
      font-size:0.9rem;
      #free{
        width:100%;
      }
    }
  }
`