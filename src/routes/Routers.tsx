import React, { Suspense, lazy, FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Loading } from '../components';
import { AppLayout } from '../layout';

const Home = lazy(() => import('../pages/Home'));
const Article = lazy(() => import('../pages/Article'));

const Routers: FC = () => {
  return (
    <Router>
      <AppLayout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article" element={<Article />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </Router>
  )
};

export { Routers };
export default Routers;
