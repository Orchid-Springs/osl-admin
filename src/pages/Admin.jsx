import React, { useState } from "react";
import {
  PieChartOutlined,
  FundProjectionScreenOutlined,
  TeamOutlined,
  CalendarOutlined,
  UserOutlined,
  SettingOutlined,
  MailOutlined,
} from "@ant-design/icons";
import favicon from "../assets/favicon.png";

import {
  Layout,
  Menu,
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import Overview from "../components/Overview";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";
import { api } from "../api/api";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Admin = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const auth = useAuth();
  const avatarName = auth?.user?.username[0] + auth?.user?.username[1] || "I";
  const [editForm] = Form.useForm();

  const items = [
    getItem(<Link to="/payments">Payments</Link>, "1", <PieChartOutlined />),
    getItem(
      <Link to="/reservations">Reservations</Link>,
      "2",
      <CalendarOutlined />
    ),
    getItem(<Link to="/spaces">Spaces</Link>, "3", <TeamOutlined />),
    getItem(
      <Link to="/promo">Promos</Link>,
      "4",
      <FundProjectionScreenOutlined />
    ),
    getItem(<Link to="/contacts">Contacts</Link>, "5", <MailOutlined />),
    auth.user.role === "super_admin"
      ? getItem(<Link to="/user">Users</Link>, "6", <UserOutlined />)
      : " ",
  ];

  const handleLogout = () => {
    setLoading(true);
    try {
      auth.logout();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleEditCancel = async () => {
    await editForm.resetFields();
    setEditModalOpen(false);
  };

  const handleSpaceEdit = async () => {
    try {
      setEditLoading(true);
      const values = await editForm.validateFields();
      if (values) {
        const id = auth?.user?._id;
        const { data } = await api.patch(`/people/${id}`, values);
        if (data) {
          setEditModalOpen(false);
          message.success("User details updated successfully");
        }
      }
    } catch (error) {
      message.error("There was an error performing operation!");
    }
    setEditLoading(false);
  };

  const showEditModal = async () => {
    try {
      setEditModalOpen(true);
      editForm.setFieldsValue({ username: auth?.user?.username });
    } catch (error) {
      message.error("There was an error performing operation!");
    }
  };

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="fixed h-screen top-0 bottom-0"
      >
        <div className="w-full p-3 flex justify-center">
          <img src={favicon} alt="" />
        </div>
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header className="px-10 bg-white flex justify-between items-center">
          <div className="text-xl">OSL Spaces</div>
          <div className="flex gap-3 items-center">
            <Avatar
              style={{ verticalAlign: "middle" }}
              className="bg-[#EC0000]"
              size="large"
              gap={2}
            >
              {avatarName}
            </Avatar>
            <Button onClick={handleLogout} loading={loading}>
              Logout
            </Button>
            <SettingOutlined onClick={() => showEditModal()} />
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
            marginTop: "16px",
            height: "80vh",
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          <Overview />
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Orchid Springs ©{new Date().getFullYear()} All rights reserved
        </Footer>
      </Layout>

      <Modal
        title="Edit Details"
        open={isEditModalOpen}
        onOk={handleSpaceEdit}
        onCancel={handleEditCancel}
        okType="default"
        okText="Save"
        confirmLoading={editLoading}
      >
        <Form layout="vertical" form={editForm}>
          <Form.Item label="Email">
            <Input value={auth?.user?.email} readOnly />
          </Form.Item>

          <Form.Item label="Phone Number">
            <Input value={auth?.user?.phonenumber} />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter a username",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter a new password",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};
export default Admin;
