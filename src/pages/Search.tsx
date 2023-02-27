import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TApiResponse, useApiGet } from '../hooks/useApiHook';
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

  const res: TApiResponse = useApiGet(query, 'sport', 2, order, currentPage);

  useEffect(() => {
    console.log(res);
    fetchData();
  }, [res.statusText])

  const navigate = useNavigate();

  const onShowDropList = () => {
    setShowDropList(!showDropList);
  };

  const fetchData = () => {
    console.log('fetchData func');
    if (res.statusText === 'ok') {
      setData([...data, ...res.data]);
      if (currentPage === res.pages) {
        console.log('all fetched');
        setHasMore(false);
        return;
      } else {
        setCurrentPage(currentPage + 1);
      }
    }
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
        <Content>
          <InfiniteScroll
            dataLength={data.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {data.map((news, index) =>
              <NewsCard
                key={index}
                image={news.thumbnail}
                title={news.webTitle}
                type={news.sectionId}
                body={news.bodyText}
                onClick={() => { navigateArticle(news); }}
              />)}
          </InfiniteScroll>
        </Content>
      </>
    </Container>
  )
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 44px 15px 38px;
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