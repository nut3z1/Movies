import React from 'react';
import LayoutPage from '../../components/layout';
import ListCarts from './components/list-cart';

const AppCart = () => {
  return (
    <>
      <LayoutPage>
        <ListCarts />
      </LayoutPage>
    </>
  )
}
export default React.memo(AppCart);