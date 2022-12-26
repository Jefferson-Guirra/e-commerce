import styled from "styled-components";

export const container = styled.main`
  height: calc(100vh - 103px);
  max-width: 1220px;
  padding-inline: 1rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    padding: 2rem;
    border-radius: 7px;
    border: 1px solid #d9d9d9;
    background-color: #eee;
    width:100%;
    svg{
      display:block;
      margin: 0 auto;
      transition:1s;
      &:hover{
        fill:var(--second-color);
      }
    }

    h1{
      width:fit-content;
      margin: 0 auto;
      margin-block:1rem 2rem;
    }
  }

  button {
    display: block;
    color: #fff;
    padding: 0.8rem 7rem;
    border-radius: 7px;
    background-color: var(--primary-color);
    margin: 0 auto;
  }
`