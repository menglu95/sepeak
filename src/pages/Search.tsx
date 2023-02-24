import React, { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TApiResponse, useApiGet } from '../hooks/useApiHook';
import { TNewsData } from '../common';
import { Loading, NewsCard, Dropdown } from '../components';

const Search: FC = () => {

  const [showDropList, setShowDropList] = useState<boolean>(false);
  const [orderVale, setOrderValue] = useState<string>('Newest First');
  const location = useLocation();
  const { query, order } = location.state;
  const data: TApiResponse = useApiGet(query, 'sport', 15, order);

  const navigate = useNavigate();
  const navigateArticle = (newsData: TNewsData) => {
    navigate('/article', { state: newsData });
  };

  const onShowDropList = () => {
    setShowDropList(!showDropList);
  };

  const onChangeOder = (e: any) => {
    setOrderValue(e.target.value);
    if (e.target.value === 'Newest First') {
      navigate('/search', { state: { query, order: 'newest' } });
    } else {
      navigate('/search', { state: { query, order: 'oldest' } });
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
              onSelected={(e) => { onChangeOder(e); }}
              value={orderVale}
            />
          </Header>
          <Content>
            {data.data.map((news) =>
              <NewsCard
                key={news.id}
                image={news.thumbnail}
                title={news.webTitle}
                type={news.sectionName}
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