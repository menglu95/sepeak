import React, { FC } from 'react';
import styled from 'styled-components';
import { navigateArticle, TNewsData } from '../common';
import { NewsCard } from '../components';

interface ISportsBundle {
  title?: string;
  data: TNewsData[];
}

const SportsBundle: FC<ISportsBundle> = ({
  title = '',
  data,
}) => {
  return (
    <Container>
      <Title>
        <div>
          {title}
        </div>
      </Title>
      <div>
        {data.map((news) =>
          <NewsCard
            key={news.id}
            image={news.thumbnail}
            title={news.webTitle}
            type={news.sectionId}
            body={news.bodyText}
            onClick={() => { navigateArticle(news); }}
          />)}
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  & > div {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
`;

const Title = styled.div`
  font-family: 'Georgia';
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 39px;
  letter-spacing: 0.07px;
  & > div {
    margin: 15px auto;
    margin: 25px;
  }
`;

export { SportsBundle };
export default SportsBundle;