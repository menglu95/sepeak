import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading, NewsCard } from '../components';
import styled from 'styled-components';
import { newsApi } from '../apis';
import { TNewsData } from '../common';

const Home: FC = () => {

  const data: TNewsData[] = newsApi.getData('sport', 12);
  const navigate = useNavigate();
  const navigateArticle = (newsData: TNewsData) => {
    navigate('/article', { state: newsData });
  }

  return (
    <>
      { data.length === 0 ?
        <Loading /> :
        <Container>
          {data.map((news) =>
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