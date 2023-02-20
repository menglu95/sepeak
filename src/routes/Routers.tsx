import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Loading } from '../components';

const Home = lazy(() => import('../pages/Home'));
const Detail = lazy(() => import('../pages/Detail'));

const Routers = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </Suspense>
    </Router>
  )
};

export { Routers };
export default Routers;
