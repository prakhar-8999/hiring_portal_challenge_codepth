import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Dropdown, Layout, Menu, message, theme} from "antd";
import {getAuth, signOut} from "firebase/auth";
import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import userimg from "../assets/dashuser.png";
import logo from "../assets/logo.png";
import firebase_app from "../firebase";
const {Header, Content, Footer, Sider} = Layout;
const auth = getAuth(firebase_app);

const items = [
  {
    key: 1,
    icon: <UserOutlined />,
    label: "apply for job",
  },
];

const Dashboard = () => {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        message.success("Logout Successfull!");
        navigate("/login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        message.error(errorMessage);
      });
  };

  const menu = (
    <Menu
      items={[
        {
          label: (
            <Button style={{width: "100%"}} onClick={logout}>
              <LogoutOutlined />
              <span className="ml-2">Logout</span>
            </Button>
          ),
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: "Thank You for Using our Service",
          key: "3",
          disabled: true,
        },
      ]}
    />
  );

  return (
    <Layout>
      <Sider breakpoint="md">
        <div className="flex justify-center">
          <img className="mx-auto h-16 w-auto" src={logo} alt="Your Company" />
        </div>
        <div className="mt-8">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Dropdown overlay={menu}>
            <button
              onClick={(e) => e.preventDefault()}
              style={{float: "right", background: "none", border: "none"}}
            >
              <img
                className="w-12 mr-6 mt-2 cursor-pointer"
                style={{
                  float: "right",
                }}
                src={userimg}
                alt="use8g76t"
              />
            </button>
          </Dropdown>

          {/* <button className='colapbutton' onClick={responsive}>{React.createElement(MenuFoldOutlined, {
            className: 'trigger',
          })}</button> */}
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: "85vh",
              //   height: "",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          {/* Ant Design ©2023 Created by Ant UED */}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
