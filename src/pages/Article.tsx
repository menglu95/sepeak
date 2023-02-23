import React, { useState, useEffect, FC } from 'react';
import { useLocation } from 'react-router-dom';
import { TNewsData } from '../common';
import { Loading } from '../components';

const Article: FC = () => {
  const location = useLocation();
  const [data, setData] = useState<TNewsData>();

  useEffect(() => {
    setData(location.state);
  }, [data]);

  return (
    <>
      {data === undefined ?
        <Loading /> :
        <div>
          <div>{data.webPublicationDate}</div>
          <div>{data.webTitle}</div>
          <div>{data.headline}</div>
          <div>{data.body}</div>
          <div>{data.thumbnail}</div>
        </div>
      }
    </>
  )
}

export { Article };
export default Article;