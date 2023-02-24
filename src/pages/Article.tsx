import React, { useState, useEffect, FC } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { TNewsData } from '../common';
import { Loading } from '../components';
import parser from 'html-react-parser';

const Article: FC = () => {
  const location = useLocation();
  const [data, setData] = useState<TNewsData>();

  useEffect(() => {
    setData(location.state);
  }, [data]);

  return (
    <>
      {data === undefined ?
        <Loading /> :
        <Container>
          <Content>
            <DateTime>{new Date(data.webPublicationDate).toUTCString()}</DateTime>
            <Title>{data.webTitle}</Title>
            <Headline>{data.headline}</Headline>
            <Detail>{parser(data.body)}</Detail>
          </Content>
          {data.thumbnail && <Media src={data.thumbnail} />}
        </Container>
      }
    </>
  )
}

const DateTime = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 31px;
  letter-spacing: 0.83px;
  text-transform: uppercase;
`;

const Title = styled.div`
  font-family: 'Georgia';
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 39px;
  letter-spacing: 0.07px;
  margin-bottom: 10px;
`;

const Headline = styled.div`
  font-family: 'Georgia';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0.07px;
`;

const Detail = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.1px;
  border-top: 1px solid var(--grey);
  margin-top: 14.25px;
`;

const Media = styled.div<{ src: string }>`
  background-image: url(${props => props.src});
  width: 445px;
  height: 267px;
  background-size: 100% 100%;
  margin: 30px;
  @media only screen and (min-width: 1200px) {
    margin-top: 305px;
  }
`;

const Content = styled.div`
  width: 635px;
  margin: 30px;
  img {
    width: 445px;
    height: 267px;
  }
  iframe {
    width: 445px;
    height: 267px;
  }
  margin-top: 111px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export { Article };
export default Article;