import styled from "styled-components";

interface MenuMob{
  values:{
    active:boolean
  }
}

export const Container = styled.header(
  (props: MenuMob) => `
  width: 100%;
  top:0;
  position:fixed;
  z-index:500;
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
    gap:1rem;
    position: relative;

    .logo {
      font-size: 2rem;
      display: flex;
      align-items: center;
      gap:0.2rem;
      font-weight: bold;
      color: #eee;
      transition:1s;
      svg {
        transition:1s;
        margin-right: 0.5rem;
      }
      &:hover{
        color:#ffa500;
        svg{
          fill:#fff;
        }
      }
    }
    .search {
      width:40%;
      height: 35px;
      display: flex;
      align-items: center;
      background-color: #fff;
      border-radius: 7px;

      .filterContainer{
        cursor:pointer;
        position:relative;
        display:flex;
        flex-direction:column;
        #filter{
          height:35px;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:0.9rem;
          border-right:1px solid #000000;
          padding:0.5rem;
          color:#000000;
         
          svg{
            transform:rotate(-90deg);
            transition:1s;
          }
        }
        .options{
          position:absolute;
          z-index:50;
          color:#000000;
          top:100%;
          font-size:0.9rem;
          width:100%;
          background-color:#fff;
          border-radius:7px;
          padding:1rem 0.5rem;
          transform:translate3d(0px,-15px,0);
          transition:1s;
          opacity:0;
          pointer-events:none;
          display:flex;
          flex-direction:column;
          gap:1rem;

          .option{
            display:flex;
            align-items:center;
            width:100%;
            gap:0.3rem;
            svg{
              transition:1s;
            }

            &:hover{
              svg{
                fill:#000000;
              }
            }
          }


        }
        &:hover{
          #filter{
            svg{
              transform:rotate(90deg);
            }
          }
          .options{
            transform:initial;
            opacity:initial;
            pointer-events:inherit;
          }
        }
      }
      #icon {
        display: block;
        padding: 0.2rem;
        border-radius:0px 7px 7px 0px;
        width: 10%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: var(--second-color);
        transition: 1s ease;
        &:hover {
          background-color: #363636;
          svg{
            fill:var(--second-color);
          }
        }
      }
    }
    input {
      height: 100%;
      flex:1;
      font-size: 1.1rem;
      border-radius: 15px;
      border: none;
      padding: 0.5rem;
    }

    .actions {
      display: flex;
      align-items: center;
      font-size:0.9rem;
      gap: 1rem;
      font-family: 'Lato', sans-serif;
      a {
        display: flex;
        align-items: center;
        svg {
          margin-right: 0.5rem;
        }
      }
      .list{
        svg{
          transition:1s;
        }
        &:hover{
          svg{
          fill:#ffa500;
          }
        }
      }
    }

    .cart {
      position: relative;
      display: flex;
      align-items: center;
      height: fit-content;
      
      span {
        font-size: 0.8rem;
        padding:0px;
        display:flex;
        position: absolute;
        top: -5px;
        left: 100%;
        transform: translate3d(-50%, -50%, 0);
        background-color: var(--second-color);
        padding:1px 5px;
        border-radius: 50%;

        p{
         padding:0px;
         margin:auto;
        }
      }
    }
  }
  @media (max-width: 955px) {
    nav {
    flex-wrap:wrap;
    .logo{
      order:1;
    }
    .search{
      flex:1;
      order:3;
    }
    .actions{
      transition:1s;
      position: absolute;
      background-color: var(--primary-color);
      padding:1rem;
      font-size:1rem;
      gap:1.5rem;
      top:calc(100% - .5px);
      right:0px;
      width:50%;
      border-radius:0px 0px 7px 7px;
      transform:${props.values.active ? 'initial' : 'translate3d(0,-30px,0)'};
      opacity:${props.values.active ? 'initial' : '0'};
      pointer-events:${props.values.active ? 'initial' : 'none'};
      margin-left:-1rem;
      align-items:initial;
      flex-direction:column;
      border-top:1px solid gray;
      .list{
        display:none;
      }
      .cart span{
        left:32px;
      }
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
      gap: 0.5rem;
      padding: 0.5rem;
      svg {
        transition: 1s;
      }
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
        font-family: 'Lato', sans-serif;

        color: #000000;
        padding: 0.5rem 0.7rem;
        border-radius: 7px;
        margin: 0 auto;
      }
      a {
        font-family: 'Lato', sans-serif;
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
        #user {
          fill: #ffa500;
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
        font-size: 1rem;
        font-family: 'Lato', sans-serif;
        color: #fff;
        a {
          padding: 0px;
          margin-top: 1.5rem;
          color: #fff;
          font-weight: inherit;
          border-bottom: transparent;
          transition: 1s;
          &:hover {
            color: var(--second-color);
          }
        }
        button {
          font-weight: inherit;
          font-size: 1rem;
          text-align: left;
          padding: 0px;
          color: #fff;
          margin: inherit;
          margin-top: 1.5rem;
          background-color: transparent;
          transition:1s;
          &:hover {
            color: var(--second-color);
          }
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
    order:2;
  }
`
)