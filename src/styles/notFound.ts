import styled from "styled-components";

export const container = styled.main`
max-width:1200px;
margin:0 auto;
padding-inline:1rem;
height: calc(100vh - 103px);
display:flex;
align-items:center;
justify-content:center;

h1{
  color:#f31;
  text-align:center;
}

@media (max-width:955px){
  height:(100vh - 154px)
}
`