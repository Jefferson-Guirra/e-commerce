import styled from 'styled-components'

export const container = styled.main`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: #8080805d;
  font-family: 'Lato', sans-serif;

  .content {
    postion: relative;
    bottom: 0;
    padding: 2rem;
    flex-shrink: 0;
    width: 100%;
    max-width: 600px;
    margin-block: 25vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    position: relative;
    border-radius: 7px;
    background-color: #eee;
    animation: 1s show-size ease;

    div {
      width: 100%;
      max-width: 600px !important;
    }

    button {
      position: absolute;
      top: 0;
      right: -35px;
      width: 35px;
      height: 35px;
      transform: translate3d(-50%, -50%, 0);
      border-radius: 50%;
      background-color: #f31;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (max-width: 650px) {
      max-width: 350px;
    }
  }

  @keyframes show-size {
    from {
      transform: scale(0.5);
    }
    to {
      transform: initial;
    }
  }
`
