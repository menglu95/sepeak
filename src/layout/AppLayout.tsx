import React, { FC } from 'react';
import styled from 'styled-components';
import logo from '../assets/Logo_White.png';
import { Link } from 'react-router-dom';

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: FC<IAppLayout> = ({ children }) => {
  return (
    <Container>
      <Header>
        <div>
          <Link to='/'><img src={logo} alt="logo" width={142} height={56} /></Link>
        </div>
      </Header>
      <Main>
        {children}
      </Main>
      <Footer></Footer>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  background: var(--primary);
  & > div {
    height: 126px;
    margin: 0 165px;
    display: flex;
    align-items: center;
  }
`;

const Main = styled.div`
  height: 100%;
`;

const Footer = styled.div`
  height: 243px;
  background: var(--primary);
`;

export { AppLayout };
export default AppLayout;