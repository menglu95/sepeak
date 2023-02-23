import React, { FC } from 'react';
import { Loading, NewsCard } from '../components';
import styled from 'styled-components';
import { newsApi } from '../apis';
import { TNewsDataType } from '../common';

const Search: FC = () => {
  const data: TNewsDataType[] = newsApi.getData('news', 12);

  // print the output
  console.log(data);

  return (
    <>
      { data.length === 0 ?
        <Loading /> :
        <Container>
          {data.map((news) => <NewsCard key={news.id} image={news.thumbnail} title={news.webTitle} type='Sports' body={news.bodyText} />)}
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