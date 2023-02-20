import React, { useState, useEffect } from 'react';
import { Loading } from '../components';

const Detail = () => {
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