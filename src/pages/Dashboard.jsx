import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Button, Dropdown, Layout, Menu, message, theme} from "antd";
import {signOut} from "firebase/auth";
import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";
import {getAuth} from "../firebase";
const {Header, Content, Footer, Sider} = Layout;

const auth = getAuth;

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
  const items = [
    {
      key: 1,
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => navigate(""),
    },
    {
      key: 2,
      icon: <UserOutlined />,
      label: "Add Job",
      onClick: () => navigate("addJobs"),
    },
    {
      key: 3,
      icon: <UserOutlined />,
      label: "apply for job",
      onClick: () => navigate("applyForJob"),
    },
    {
      key: 4,
      icon: <UserOutlined />,
      label: "Applied Jobs",
      onClick: () => navigate("appliedJobs"),
    },
  ];

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

  // useEffect(() => {
  //   const user = auth.currentUser;
  //   if (!user) {
  //     message.error("Unauthorized!");
  //     navigate("/");
  //   }
  // }, []);

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
              <Avatar
                style={{backgroundColor: "#87d068"}}
                icon={<UserOutlined />}
                className="mt-3 mr-5 cursor-pointer"
              />
            </button>
          </Dropdown>
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
