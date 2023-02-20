import React, { Suspense, lazy, FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Loading } from '../components';
import { AppLayout } from '../layout';

const Home = lazy(() => import('../pages/Home'));
const Detail = lazy(() => import('../pages/Detail'));

const Routers: FC = () => {
  return (
    <Router>
      <AppLayout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </Router>
  )
};

export { Routers };
export default Routers;
