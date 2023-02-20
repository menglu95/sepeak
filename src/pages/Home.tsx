import React, { useState, useEffect, FC } from 'react';
import { Loading, NewsCard } from '../components';

const Home: FC = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      { loading ?
        <Loading /> :
        <div>
          <NewsCard
            // image='https://media.guim.co.uk/ff81fe1b3329aceff3dff9607459084f4653890c/0_128_3096_1857/500.jpg'
            title='Coronavirus live news: markets fall over fears of long US'
            body='Republican senators on Capitol Hill have expressed their dismay at a Donald Trump.'
            type='Sports'
          />
        </div>
      }
    </>
  )
}

export { Home };
export default Home;