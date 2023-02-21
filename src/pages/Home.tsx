import React, { FC } from 'react';
import { Loading, NewsCard } from '../components';
import styled from 'styled-components';
import { sportNewsApi } from '../apis';
import { TNewsDataType } from '../common';

const Home: FC = () => {
  const data: TNewsDataType[] = sportNewsApi.getLimit(2);

  // print the output
  console.log(data);

  return (
    <>
      { data.length === 0 ?
        <Loading /> :
        <Container>
          <NewsCard
            image='https://media.guim.co.uk/ff81fe1b3329aceff3dff9607459084f4653890c/0_128_3096_1857/500.jpg'
            title='Coronavirus live news: markets fall over fears of long US'
            body='Republican senators on Capitol Hill have expressed their dismay at a Donald Trump.'
            type='Sports'
          />
        </Container>
      }
    </>
  )
}

const Container = styled.div``;

export { Home };
export default Home;