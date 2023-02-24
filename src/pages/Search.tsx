import React, { FC } from 'react';
import { Loading, NewsCard } from '../components';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TApiResponse, useApiGet } from '../hooks/useApiHook';
import { TNewsData } from '../common';

const Search: FC = () => {
  const location = useLocation();
  const data: TApiResponse = useApiGet(location.state, 'sport', 15);
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
              type={news.sectionName}
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

export { Search };
export default Search;