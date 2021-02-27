import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LayoutPage from '../../components/layout';
import FeaturedPage from './components/featured';
import LatestPage from './components/latest';
import TopSellingPage from './components/top-selling';
import { getDataProducts } from './actions/index';

const HomePage = () => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(getDataProducts());
  }, [dispatch]);

  return (
    <LayoutPage>
      <FeaturedPage/>
      <LatestPage/>
      <TopSellingPage/>
    </LayoutPage>
  )
}
export default React.memo(HomePage);