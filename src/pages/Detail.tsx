import React, { useState, useEffect, FC } from 'react';
import { Loading } from '../components';

const Detail: FC = () => {
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
        <div>Detail Page</div>
      }
    </>
  )
}

export { Detail };
export default Detail;