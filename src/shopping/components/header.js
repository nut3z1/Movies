import React from 'react';
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

const { Header } = Layout;

const HeaderComponent = () => {
  const countCarts = useSelector(state => state.cart.countItems);
  console.log(countCarts);
  const { pathname } = useLocation();
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={pathname}>
        <Menu.Item key="/home">
          <NavLink to="/home">Home</NavLink>
        </Menu.Item>
        <Menu.Item key="/cart">
          <NavLink to="/cart">Cart ( {countCarts} )</NavLink>
        </Menu.Item>
      </Menu>
    </Header>
  )
}
export default React.memo(HeaderComponent);