import React, { useState, useEffect, FC } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { TNewsData, findMediaFromBodyText } from '../common';
import { Loading } from '../components';
import parser from 'html-react-parser';

const Article: FC = () => {
  const location = useLocation();
  const [data, setData] = useState<TNewsData>();
  const [media, setMedia] = useState<string>('');

  useEffect(() => {
    setData(location.state);
    setMedia(findMediaFromBodyText(data?.body || ''));
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
          {media !== '' && <Media>{parser(media)}</Media>}
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
  img {
    width: 100%;
    height: 100%;
  }
`;

const Media = styled.div`
  width: 445px;
  height: 267px;
  img {
    width: 100%;
    height: 100%;
  }
  figcaption {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.3px;
    color: rgba(0, 0, 0, 0.87);
    mix-blend-mode: normal;
    opacity: 0.5;
  }
  margin: 30px;
  @media only screen and (min-width: 1200px) {
    margin-top: 305px;
  }
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const Content = styled.div`
  width: 635px;
  margin: 30px;
  iframe {
    width: 445px;
    height: 267px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  margin-top: 111px;
  @media only screen and (max-width: 650px) {
    width: 95%;
    margin-top: 30px;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export { Article };
export default Article;