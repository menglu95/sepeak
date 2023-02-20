import React, { useState, useEffect } from 'react';
import { Loading } from '../components';

const Home = () => {
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
        <div>Home Page</div>
      }
    </>
  )
}

export { Home };
export default Home;