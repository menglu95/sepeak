import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Loading, NewsCard, SportsBundle } from '../components';
import styled from 'styled-components';
import { EDropOptions, TNewsData } from '../common';
import { TApiResponse, useApiGet } from '../hooks/useApiHook';

type TTopStories = {
  data: TNewsData[];
  loaded: boolean;
};

const Home: FC = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>();
  const [orderValue, setOrderValue] = useState<string>(EDropOptions.NEWEST_FIRST);
  const [showDropList, setShowDropList] = useState<boolean>(false);

  const newestSportData: TApiResponse = useApiGet('', 'sport', 7, order);
  const newestCultureData: TApiResponse = useApiGet('', 'culture', 3, order);
  const newestLifeData: TApiResponse = useApiGet('', 'lifeandstyle', 1, order);

  const topStoriesData = { loaded: false } as TTopStories;
  if (newestSportData.statusText === 'ok' && newestCultureData.statusText === 'ok' && newestLifeData.statusText === 'ok') {
    topStoriesData.data = [...newestCultureData.data, ...newestLifeData.data, ...newestSportData.data];
    topStoriesData.loaded = !newestCultureData.loading && !newestLifeData.loading && !newestSportData.loading;
  }

  const onShowDropList = () => {
    setShowDropList(!showDropList);
  };

  const onChangeOrder = (e: any) => {
    setOrderValue(e.target.value);
    setShowDropList(false);
    switch (e.target.value) {
      case EDropOptions.NEWEST_FIRST:
        setOrder('newest');
        break;
      case EDropOptions.OLDEST_FIRST:
        setOrder('oldest');
        break;
      case EDropOptions.MOST_POPULAR:
        setOrder('relevance');
        break;
      default:
        break;
    }
  };

  const navigateArticle = (newsData: TNewsData) => {
    navigate('/article', { state: newsData });
  };

  return (
    <>
      { !topStoriesData.loaded ?
        <Loading /> :
        <Container>
          <TopStory>
            <Header>
              <Title>Top stories</Title>
              <Dropdown
                onClick={onShowDropList}
                expand={showDropList}
                onSelected={(e) => { onChangeOrder(e); }}
                value={orderValue}
              />
            </Header>
            <Content>
              <NewsCard
                className="news-card"
                key={topStoriesData.data[0].id}
                image={topStoriesData.data[0].thumbnail}
                title={topStoriesData.data[0].webTitle}
                type={topStoriesData.data[0].sectionId}
                body={topStoriesData.data[0].bodyText}
                onClick={() => { navigateArticle(topStoriesData.data[0]); }}
                width={540}
                height={423}
              />
              <div>
                <NewsCard
                  className="news-card"
                  key={topStoriesData.data[4].id}
                  image={topStoriesData.data[4].thumbnail}
                  title={topStoriesData.data[4].webTitle}
                  type={topStoriesData.data[4].sectionId}
                  body={topStoriesData.data[4].bodyText}
                  onClick={() => { navigateArticle(topStoriesData.data[4]); }}
                  width={255}
                  height={252}
                />
                <NewsCard
                  className="news-card"
                  key={topStoriesData.data[3].id}
                  image={topStoriesData.data[3].thumbnail}
                  title={topStoriesData.data[3].webTitle}
                  type={topStoriesData.data[3].sectionId}
                  body={topStoriesData.data[3].bodyText}
                  onClick={() => { navigateArticle(topStoriesData.data[3]); }}
                  width={255}
                  height={252}
                />
                <NewsCard
                  className="news-card"
                  key={topStoriesData.data[1].id}
                  image={topStoriesData.data[1].thumbnail}
                  title={topStoriesData.data[1].webTitle}
                  type={topStoriesData.data[1].sectionId}
                  body={topStoriesData.data[1].bodyText}
                  onClick={() => { navigateArticle(topStoriesData.data[1]); }}
                  width={255}
                  height={252}
                  isShownImage={false}
                />
                <NewsCard
                  className="news-card"
                  key={topStoriesData.data[2].id}
                  image={topStoriesData.data[2].thumbnail}
                  title={topStoriesData.data[2].webTitle}
                  type={topStoriesData.data[2].sectionId}
                  body={topStoriesData.data[2].bodyText}
                  onClick={() => { navigateArticle(topStoriesData.data[2]); }}
                  width={255}
                  height={252}
                  isShownImage={false}
                />
              </div>
            </Content>
          </TopStory>
          <SportsBundle data={[topStoriesData.data[5], topStoriesData.data[6], topStoriesData.data[7]]} />
          <SportsBundle title="Sports" data={[topStoriesData.data[8], topStoriesData.data[9], topStoriesData.data[10]]} />
        </Container>
      }
    </>
  )
}

const Container = styled.div`
  margin: 0 auto;
  width: calc(100% - 300px);
  @media only screen and (min-width: 1440px) {
    width: 1140px;
  }
  @media only screen and (max-width: 1439px) {
    width: calc(100% - 200px);
  }
  @media only screen and (max-width: 1339px) {
    width: calc(100% - 100px);
  }
  @media only screen and (max-width: 1239px) {
    width: 100%;
  }
  @media only screen and (max-width: 577px) {
    .news-card {
      width: 350px !important;
      height: 347px !important;
    }
  }
`;

const TopStory = styled.div`
  
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > div: last-child {
    width: 570px;
    display: flex;
    flex-wrap: wrap;
    @media only screen and (max-width: 577px) {
      justify-content: center;
    }
  }
  @media only screen and (max-width: 1139px) {
    justify-content: center;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 44px 15px 13px;
  @media only screen and (max-width: 577px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-family: 'Georgia';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 49px;
`;

export { Home };
export default Home;