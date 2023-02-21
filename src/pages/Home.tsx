import React, { FC } from 'react';
import { Loading, NewsCard } from '../components';
import styled from 'styled-components';
import { useApiGet, TApiResponse } from '../hooks/useApiHook';

const Home: FC = () => {
  const data: TApiResponse = useApiGet(
    'https://content.guardianapis.com/search?section=sport&page-size=2&use-date=published&order-by=newest&show-fields=headline%2Cthumbnail%2Cbody%2CbodyText&show-elements=all&api-key=347d2d3b-47eb-46cc-a762-103c626745db'
  );

  // print the output
  console.log(data);

  return (
    <>
      { data.loading ?
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