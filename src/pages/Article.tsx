import React, { useState, useEffect, FC } from 'react';
import { Loading } from '../components';

const Article: FC = () => {
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
        <div>Article Page</div>
      }
    </>
  )
}

export { Article };
export default Article;