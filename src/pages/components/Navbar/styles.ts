import styled from "styled-components";

interface MenuMob{
  values:{
    active:boolean
  }
}

export const Container = styled.header(
  (props:MenuMob)=>`
  width: 100%;
  background-color: var(--primary-color);
  color:#fff;

  nav {
    max-width: 1200px;
    margin: 0 auto;
    padding-block: 1.5rem;
    display: flex;
    align-items: center;
    padding-inline: 1rem;
    justify-content: space-between;
    position: relative;

    .logo {
      font-size: 2rem;
      display: flex;
      align-items: center;
      font-weight: bold;
      color: #eee;
      svg {
        margin-right: 0.5rem;
      }
    }
    .search {
      width: 500px;
      height: 35px;
      display: flex;
      align-items: center;
      background-color: #fff;
      border-radius: 7px;
      overflow: hidden;
      span {
        display: block;
        padding: 0.2rem;
        width: 10%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: #343840;
        transition: 1s ease;
        &:hover {
          background-color: var(--primary-color);
        }
      }
    }
    input {
      height: 100%;
      width: 90%;
      font-size: 1.1rem;
      border-radius: 15px;
      border: none;
      padding: 0.5rem;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      a {
        display: flex;
        align-items: center;
        svg {
          margin-right: 0.5rem;
        }
      }
    }

    .cart {
      position: relative;
      display: flex;
      align-items: center;
      height: fit-content;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        position: absolute;
        top: -5px;
        left: 100%;
        transform: translate3d(-50%, -50%, 0);
        background-color: var(--second-color);
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
    }
  }
  @media (max-width: 955px) {
    nav .actions {
      transition:1s;
      position: absolute;
      z-index:50;
      background-color: var(--primary-color);
      padding:1rem;
      height:350px;
      gap:1.5rem;
      top:100%;
      width:50%;
      border-radius:0px 0px 7px 0px;
      transform:${props.values.active ? 'initial' : 'translate3d(0,-30px,0)'};
      opacity:${props.values.active ? 'initial' : '0'};
      pointer-events:${props.values.active ? 'initial': 'none'};
      margin-left:-1rem;
      align-items:initial;
      flex-direction:column;
      border-top:1px solid gray;
      .cart span{
        left:35px;
      }
    }
  }
`
)

export const userActions = styled.ul`
  li {
    position: relative;
    p {
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 1.1rem;
      gap: 0.5rem;
      padding: 0.5rem;
      #arrow {
        transform: rotate(90deg);
        transition: 1s ease;
      }
    }
    .links {
      background-color: #fff;
      transform: translate3d(0, -15px, 0);
      opacity: 0;
      transition: 1s;
      pointer-events: none;
      padding-block: 1rem;
      position: absolute;
      z-index: 50;
      top: 100%;
      width: 100%;
      border-radius: 7px;
      button {
        display: block;
        width: calc(100% - 1rem);
        background-color: var(--second-color);
        font-weight: bold;
        color: #000000;
        padding: 0.5rem 0.7rem;
        border-radius: 7px;
        margin: 0 auto;
      }
      a {
        margin-top: 1rem;
        color: black;
        padding-inline: 0.5rem;
      }
    }

    &:hover {
      p {
        #arrow {
          transform: rotate(-90deg);
        }
      }
      .links {
        transform: initial;
        opacity: initial;
        pointer-events: initial;
      }
    }
  }

  @media (max-width: 955px) {
    li {
      cursor: initial;
      p {
        padding: 0px;
        #arrow {
          display: none;
        }
      }
      .links {
        padding: 0px;
        background-color: transparent;
        a {
          padding: 0px;
          margin-top: 1.5rem;
          color: #fff;
          font-weight: inherit;
          border-bottom: transparent;
        }
        button {
          font-weight: inherit;
          font-size: 1.2rem;

          text-align: left;
          padding: 0px;
          color: #fff;
          margin: inherit;
          margin-top: 1.5rem;
          background-color: transparent;
        }
        opacity: 1;
        position: static;
        transform: initial;
      }
    }
  }
`

export const hamburguer = styled.div(
  (props: MenuMob) => `
width:40px;
height:20px;
cursor:pointer;
position:relative;
display:none;

  span{
    position:absolute;
    display:block;
    width:100%;
    height:2px;
    background-color:white;
    border-radius:2px;
    transition:1s;
  }
  .line1{
    top:${props.values.active ? '10px' : '0'};
    transform:${
      props.values.active ? 'rotate(45deg)' : 'initial'
    };

  }
  .line2{
    top:10px;
    opacity:${props.values.active ? 0 : 'initial'};
  }
  .line3{
    top:${props.values.active ? '10px' : '20px'};
    transform:${
      props.values.active ? 'rotate(-45deg)' : 'initial'
    };

  }
  @media (max-width:955px){
    display:block;
  }
`
)