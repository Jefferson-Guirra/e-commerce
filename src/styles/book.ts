import styled from "styled-components";

export const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding-inline: 1rem;
  margin-top: 5rem;

  .aboutBook {
    display: flex;
    gap: 1rem;

    .contentBook {
      display: flex;
      gap: 1rem;

      .infoBook {
        display: flex;
        gap: 1rem;
        width: 80%;
        img {
          width: 200px;
        }
        .textBook {
          display: flex;
          flex-direction: column;
          font-size: 0.9rem;
          gap: 0.5rem;
          .itemText{
            display:flex;
            align-items:center;
            gap:0.2rem;
          }
          #list{
            cursor:pointer;
          }
          p {
            text-align: justify;
            line-height: 150%;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
`