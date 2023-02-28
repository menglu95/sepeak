import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useApiGet, TApiResponse } from '../hooks/useApiHook';
import { TNewsData, EDropOptions } from '../common';
import { Loading, NewsCard, Dropdown } from '../components';
import InfiniteScroll from 'react-infinite-scroll-component';

const Search: FC = () => {
  const [data, setData] = useState<TNewsData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [showDropList, setShowDropList] = useState<boolean>(false);
  const [orderValue, setOrderValue] = useState<string>(EDropOptions.NEWEST_FIRST);
  const location = useLocation();
  const { query, order } = location.state;

  const res: TApiResponse = useApiGet(query, 'sport', 15, order, currentPage);

  useEffect(() => {
    setCurrentPage(1);
    setData([...res.data]);
  }, [query, order]);

  useEffect(() => {
    setData([...data, ...res.data]);
  }, [res.currentPage]);

  const navigate = useNavigate();

  const onShowDropList = () => {
    setShowDropList(!showDropList);
  };

  const onChangeOrder = (e: any) => {
    setOrderValue(e.target.value);
    setShowDropList(false);
    switch (e.target.value) {
      case EDropOptions.NEWEST_FIRST:
        navigate('/search', { state: { query, order: 'newest' } });
        break;
      case EDropOptions.OLDEST_FIRST:
        navigate('/search', { state: { query, order: 'oldest' } });
        break;
      case EDropOptions.MOST_POPULAR:
        navigate('/search', { state: { query, order: 'relevance' } });
        break;
      default:
        break;
    }
  };

  const navigateArticle = (newsData: TNewsData) => {
    navigate('/article', { state: newsData });
  };

  const onNextPage = () => {
    if (currentPage === res.pages) {
      setHasMore(false);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Container>
      <>
        <Header>
          <Title>Search results</Title>
          <Dropdown
            onClick={onShowDropList}
            expand={showDropList}
            onSelected={(e) => { onChangeOrder(e); }}
            value={orderValue}
          />
        </Header>

        <InfiniteScroll
          height={window.innerHeight - 418}
          dataLength={data.length}
          next={onNextPage}
          hasMore={hasMore}
          loader={<Loading />}
        >
          <Content>
            {data.map((news, index) =>
              <NewsCard
                key={index}
                image={news.thumbnail}
                title={news.webTitle}
                type={news.sectionId}
                body={news.bodyText}
                onClick={() => { navigateArticle(news); }}
              />)}
          </Content>
        </InfiniteScroll>
      </>
    </Container>
  )
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 44px 15px 21px;
  @media only screen and (max-width: 1060px) {
    flex-direction: column;
    margin: 44px 15px 18px;
  }
`;

const Title = styled.div`
  font-family: 'Georgia';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 49px;
  @media only screen and (max-width: 385px) {
    font-size: 32px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media only screen and (max-width: 1440px) {
    justify-content: center;
  }
  flex-wrap: wrap;
`;

const Container = styled.div`
  margin: 0 auto;
  width: calc(100% - 300px);
  @media only screen and (min-width: 1440px) {
    width: 1140px;
  }
  @media only screen and (max-width: 1060px) {
    width: 100%;
  }
`;

export { Search };
export default Search;