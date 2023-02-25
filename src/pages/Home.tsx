import React, { FC, useState } from 'react';
import { Dropdown, Loading, NewsCard, SportsBundle } from '../components';
import styled from 'styled-components';
import { EDropOptions, TNewsData, navigateArticle } from '../common';
import { TApiResponse, useApiGet } from '../hooks/useApiHook';

const Home: FC = () => {
  const [order, setOrder] = useState<any>();
  const [orderValue, setOrderValue] = useState<string>(EDropOptions.NEWEST_FIRST);
  const [showDropList, setShowDropList] = useState<boolean>(false);

  const newestSportData: TApiResponse = useApiGet('', 'sport', 7, order);
  const newestCultureData: TApiResponse = useApiGet('', 'culture', 3, order);
  const newestLifeData: TApiResponse = useApiGet('', 'lifeandstyle', 1, order);

  let topStoriesData: TNewsData[] = [];

  if (newestSportData.statusText === 'ok' && newestCultureData.statusText === 'ok' && newestLifeData.statusText === 'ok') {
    topStoriesData = [...newestCultureData.data, ...newestLifeData.data, ...newestSportData.data];
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

  return (
    <>
      { topStoriesData.length === 0 ?
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
                key={topStoriesData[0].id}
                image={topStoriesData[0].thumbnail}
                title={topStoriesData[0].webTitle}
                type={topStoriesData[0].sectionId}
                body={topStoriesData[0].bodyText}
                onClick={() => { navigateArticle(topStoriesData[0]); }}
                width={540}
                height={423}
              />
              <div>
                <NewsCard
                  key={topStoriesData[4].id}
                  image={topStoriesData[4].thumbnail}
                  title={topStoriesData[4].webTitle}
                  type={topStoriesData[4].sectionId}
                  body={topStoriesData[4].bodyText}
                  onClick={() => { navigateArticle(topStoriesData[4]); }}
                  width={255}
                  height={252}
                />
                <NewsCard
                  key={topStoriesData[3].id}
                  image={topStoriesData[3].thumbnail}
                  title={topStoriesData[3].webTitle}
                  type={topStoriesData[3].sectionId}
                  body={topStoriesData[3].bodyText}
                  onClick={() => { navigateArticle(topStoriesData[3]); }}
                  width={255}
                  height={252}
                />
                <NewsCard
                  key={topStoriesData[1].id}
                  image={topStoriesData[1].thumbnail}
                  title={topStoriesData[1].webTitle}
                  type={topStoriesData[1].sectionId}
                  body={topStoriesData[1].bodyText}
                  onClick={() => { navigateArticle(topStoriesData[1]); }}
                  width={255}
                  height={252}
                  isShownImage={false}
                />
                <NewsCard
                  key={topStoriesData[2].id}
                  image={topStoriesData[2].thumbnail}
                  title={topStoriesData[2].webTitle}
                  type={topStoriesData[2].sectionId}
                  body={topStoriesData[2].bodyText}
                  onClick={() => { navigateArticle(topStoriesData[2]); }}
                  width={255}
                  height={252}
                  isShownImage={false}
                />
              </div>
            </Content>
          </TopStory>
          <SportsBundle data={[topStoriesData[5], topStoriesData[6], topStoriesData[7]]} />
          <SportsBundle title="Sports" data={[topStoriesData[8], topStoriesData[9], topStoriesData[10]]} />
        </Container>
      }
    </>
  )
}

const Container = styled.div`
  margin: 0 150px;
`;

const TopStory = styled.div`
  
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > div {
    width: 570px;
    display: flex;
    flex-wrap: wrap;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 44px 15px 13px;
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