import styled from "styled-components";

export const container = styled.div`
  margin-bottom: 2rem;

  .label {
    font-size: 1.3rem;
    cursor: pointer;
    display: block;
  }

  .input {
    padding: 0.5rem;
    background-color: transparent;
    position: relative;
    color: #000000;
    font-size: 1.3rem;
    width: 100%;
    border: none;
    background-color:#fff;
    border-radius:7px;
    border: 1px solid #d9d9d9;
    transition: 1.5s;
  }
  .input:hover,
  .input:focus {
    outline: none;
    border-color: var(--second-color);
  }

  .error {
    color: #f31;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`