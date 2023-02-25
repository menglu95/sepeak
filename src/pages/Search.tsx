import React, { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TApiResponse, useApiGet } from '../hooks/useApiHook';
import { TNewsData, EDropOptions, navigateArticle } from '../common';
import { Loading, NewsCard, Dropdown } from '../components';

const Search: FC = () => {
  const [showDropList, setShowDropList] = useState<boolean>(false);
  const [orderValue, setOrderValue] = useState<string>(EDropOptions.NEWEST_FIRST);
  const location = useLocation();
  const { query, order } = location.state;
  const data: TApiResponse = useApiGet(query, 'sport', 15, order);

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

  return (
    <>
      { data.loading ?
        <Loading /> :
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
            {data.data.map((news) =>
              <NewsCard
                key={news.id}
                image={news.thumbnail}
                title={news.webTitle}
                type={news.sectionId}
                body={news.bodyText}
                onClick={() => { navigateArticle(news); }}
              />)}
          </Content>
        </>
      }
    </>
  )
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 44px 165px 38px;
`;

const Title = styled.div`
  font-family: 'Georgia';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 49px;
`;

const Content = styled.div`
  margin: 0 150px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export { Search };
export default Search;