import styled from "styled-components";

export const container = styled.main`
  height: calc(100vh - 103px);
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    max-width: 1220px;
    padding-inline: 1rem;
    border-radius: 7px;
    margin: 0 auto;

    width: 100%;
    #booksIcon {
      display: block;
      margin: 0 auto;
      transition: 1s;
      &:hover {
        fill: var(--second-color);
      }
    }

    h1 {
      width: fit-content;
      margin: 0 auto;
      margin-block: 1rem 2rem;
    }
    form {
      margin: 0 auto;
      width: 330px;
      .error {
        color: #f31;
        font-size: 0.875rem;
        margin-top:-2rem;
      }
    }
    @media (max-width: 550px) {
      button {
        margin-top: 1.5rem;
      }

      h1 {
        margin-block: 1rem;
      }
    }
  }

  button {
    display: block;
    color: #fff;
    padding-block: 0.8rem;
    width: 100%;
    border-radius: 7px;
    background-color: var(--primary-color);
    margin: 0 auto;
    margin-top: 2rem;
  }
  #googleLogin {
    display: flex;
    align-items: center;
    padding-block: 0.5rem;
    justify-content: center;
    border: 1px solid var(--primary-color) !important;
    background-color: transparent;
    color: #000000;
    gap: 0.5rem;
  }
`