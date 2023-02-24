import React, { FC } from 'react';
import { Loading, NewsCard } from '../components';
import styled from 'styled-components';
import { newsApi } from '../apis';
import { TApiResponse } from '../hooks/useApiHook';

const Search: FC = () => {
  const data: TApiResponse = newsApi.getData('', 'news', 2);

  return (
    <>
      { data.loading ?
        <Loading /> :
        <Container>
          {data.data.map((news) => <NewsCard key={news.id} image={news.thumbnail} title={news.webTitle} type={news.sectionName} body={news.bodyText} />)}
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