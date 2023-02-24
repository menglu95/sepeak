import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading, NewsCard } from '../components';
import styled from 'styled-components';
import { TNewsData } from '../common';
import { TApiResponse, useApiGet } from '../hooks/useApiHook';

const Home: FC = () => {

  const data: TApiResponse = useApiGet('', 'sport', 4);
  console.log('data', data);
  const navigate = useNavigate();
  const navigateArticle = (newsData: TNewsData) => {
    navigate('/article', { state: newsData });
  }

  return (
    <>
      { data.loading ?
        <Loading /> :
        <Container>
          {data.data.map((news) =>
            <NewsCard
              key={news.id}
              image={news.thumbnail}
              title={news.webTitle}
              type={news.sectionId}
              body={news.bodyText}
              onClick={() => { navigateArticle(news); }}
            />)}
        </Container>
      }
    </>
  )
}

const Container = styled.div`
  width: calc(100% - 300px);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export { Home };
export default Home;