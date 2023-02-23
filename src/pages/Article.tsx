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
            <DateTime>{data.webPublicationDate}</DateTime>
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

const DateTime = styled.div``;

const Title = styled.div``;

const Headline = styled.div``;

const Detail = styled.div`

`;

const Media = styled.div<{ src: string }>`
  background-image: url(${props => props.src});
  width: 445px;
  height: 267px;
  background-size: 100% 100%;
`;

const Content = styled.div`
  width: 635px;
  margin: 30px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export { Article };
export default Article;