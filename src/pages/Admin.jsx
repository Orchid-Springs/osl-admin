import React, { useState } from 'react';
import {
  PieChartOutlined,
  FundProjectionScreenOutlined,
  TeamOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import favicon from '../assets/favicon.png';

import { Layout, Menu, theme, Avatar, Button } from 'antd';
import Overview from '../components/Overview';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to='/payments' >Payments</Link>, '1', <PieChartOutlined />),
  getItem(<Link to='/reservations' >Reservations</Link>, '2', <CalendarOutlined />),
  getItem(<Link to='/spaces' >Spaces</Link>, '3', <TeamOutlined />),
  getItem(<Link to='/promo' >Promos</Link>, '4', <FundProjectionScreenOutlined />),
];

const Admin = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const avatarName = auth?.user?.username[0] + auth?.user?.username[1] || 'I'

  const handleLogout = () => {
    setLoading(true)
    try {
      auth.logout()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className='fixed h-screen top-0 bottom-0' >
        <div className='w-full p-3 flex justify-center'>
          <img src={favicon} alt="" />
        </div>
        <Menu theme="dark"  mode="inline" items={items} />
      </Sider>
      <Layout>
      <Header 
        className='px-10 bg-white flex justify-between items-center'
      > 
        <div className='text-xl'>
          OSL Spaces
        </div>
        <div className='flex gap-3 items-center'>
          <Avatar style={{ verticalAlign: 'middle' }} className='bg-[#EC0000]' size="large" gap={2}>
            {avatarName}
          </Avatar>
          <Button onClick={handleLogout} loading={loading}>
            Logout
          </Button>
        </div>
      </Header>
        <Content
          style={{
            margin: '0 16px',
            marginTop: '16px',
            height: '80vh',
            overflowY: 'auto',
            overflowX: 'auto',
          }}
        >
          <Overview />
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Orchid Springs ©2023 All rights reserved
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Admin;