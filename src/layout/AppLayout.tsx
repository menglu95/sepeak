import React, { FC, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/Logo_White.png';
import { SearchBox } from '../components';

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: FC<IAppLayout> = ({ children }) => {
  const [extend, setExtend] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const navigate = useNavigate();

  const onExtendSearchbar = () => {
    setExtend(true);
  };

  const onSearch = (e: any) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (value !== '') {
      navigate('/search', { state: { query: value, order: 'newest' } });
      setExtend(false);
      setValue('');
    }
  };

  const onBlur = () => {
    setExtend(false);
  };

  return (
    <Container>
      <Header>
        <div>
          <Link to='/'><img className="logo" src={logo} alt="logo" width={142} height={56} /></Link>
          <SearchBox
            placeholder='Search all news'
            expanded={extend}
            onClick={onExtendSearchbar}
            onChange={(e) => onSearch(e)}
            value={value}
            onSubmit={(e) => onSubmit(e)}
            onBlur={onBlur}
          />
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
    margin: 0 auto;
    width: calc(100% - 330px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media only screen and (min-width: 1440px) {
      width: 1110px;
    }
    @media only screen and (max-width: 775px) {
      width: calc(100% - 30px);
    }
    @media only screen and (max-width: 425px) {
      .logo {
        display: none;
      }
      justify-content: center;
    }
  }
`;

const Main = styled.div`
  height: 100%;
  overflow: auto;
`;

const Footer = styled.div`
  height: 243px;
  background: var(--primary);
`;

export { AppLayout };
export default AppLayout;