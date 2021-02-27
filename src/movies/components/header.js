import React from 'react';
import { Layout, Menu } from 'antd';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import * as api from '../services/login';

const { Header } = Layout;
const HeaderComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const pathname = location.pathname;
  const infoUser = api.decodeTokenFormLocalStorage();

  const logout = () => {
    if(infoUser !== null) {
      api.removeTokenLocalStorage();
      history.push('/login');
    }
  }

  return (
    <Header>
      <NavLink to="/">
        <div className="logo" />
      </NavLink>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={pathname}>
        <Menu.Item key="/home">
          <NavLink to="/home">Trang chu</NavLink>
        </Menu.Item>
        <Menu.Item key="/new-film">
          <NavLink to="/new-film">Phim moi</NavLink>
        </Menu.Item>
        <Menu.Item key="/search-film">
          <NavLink to="/search-film">Tim kiem</NavLink>
        </Menu.Item>

        {infoUser === null && (
          <Menu.Item key="/login">
            <NavLink to="/login">Dang nhap</NavLink>
          </Menu.Item>
        ) }
    
        <Menu.Item>
          <strong>
            {infoUser !== null ? `
            Hi: ${infoUser.username}` : null}
          </strong>
        </Menu.Item>
        {infoUser !== null && (
          <Menu.Item>
            <span onClick={() => logout()}>Thoat</span>
          </Menu.Item>
        )}
        
      </Menu>
    </Header>
  )
}
export default React.memo(HeaderComponent);