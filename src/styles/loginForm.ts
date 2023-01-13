import styled from "styled-components";

export const container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 103px);
  .content {
    max-width: 1220px;
    padding-inline: 1rem;
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
      margin-block: 1rem;
    }
    form {
      margin: 0 auto;
      width: 330px;
      .userErro {
        color: #f31;
        font-size: 0.875rem;
        margin-top: -1rem;
      }
      .passwordContainer {
        position: relative;
        #passwordIcon {
          position: absolute;
          cursor: pointer;
          top: 2.2rem;
          right: 0.5rem;
        }
      }
    }
  }

  button {
    display: block;
    color: #fff;
    padding-block: 0.8rem;
    font-weight: bold;
    width: 100%;
    border-radius: 7px;
    background-color: var(--primary-color);
    margin: 0 auto;
    margin-top: 1.5rem;
  }
  #googleLogin {
    display: flex;
    width: 330px;
    color: #fff !important;
    font-weight: bold;
    align-items: center;
    padding-block: 0.5rem;
    justify-content: center;
    border: none;
    background-color: var(--second-color);
    color: #000000;
    gap: 0.5rem;
  }
  @media (max-width: 955px) {
    height: calc(100vh - 154px);
  }
`;
