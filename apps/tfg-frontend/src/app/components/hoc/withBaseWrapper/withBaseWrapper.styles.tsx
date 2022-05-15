import styled from "styled-components"

export const StyledHeader = styled.header`
  position: fixed;
  z-index: 10;
  top: 0;
`
export const StyledContent = styled.div`
  background-color: ${({ theme }) => theme.palette['background'].default};
  height: 100vh;
  padding-top: 64px;
`
export const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.palette['background'].paper};
  padding: 48px 0px;
  box-sizing: inherit;
`

export const StyledFooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h5 {
    margin-bottom: 0.35rem;
  }
`
