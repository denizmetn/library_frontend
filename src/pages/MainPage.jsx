import React, { useState } from "react";
import { Layout, Menu, theme, Dropdown, Avatar } from "antd";
import {
  UserOutlined,
  HistoryOutlined,
  ReadOutlined,
  BookOutlined,
  CreditCardOutlined,
  StarOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Books from "./Books";
import IBorrowed from "./IBorrowed";
import BorrowHistory from "./BorrowHistory";
import Payments from "./Payments";
import Favorites from "./Favorites";

const { Header, Content, Footer, Sider } = Layout;
const menuItems = [
  {
    key: "1",
    icon: <BookOutlined />,
    label: "Kitaplar",
  },
  {
    key: "2",
    icon: <ReadOutlined />,
    label: "Ödünç Aldıklarım",
  },
  {
    key: "3",
    icon: <HistoryOutlined />,
    label: "Ödünç Geçmişim",
  },
  {
    key: "4",
    icon: <CreditCardOutlined />,
    label: "Ödemeler",
  },

  {
    key: "5",
    icon: <StarOutlined />,
    label: "Favorilerim",
  },
];

const userMenu = (
  <Menu>
    <Menu.Item key="settings" icon={<SettingOutlined />}>
      <a onClick={(e) => e.preventDefault()} href="#">
        Ayarlar
      </a>
    </Menu.Item>
    <Menu.Item key="logout" icon={<LogoutOutlined />}>
      <a href="/login">Çıkış</a>
    </Menu.Item>
  </Menu>
);

const MainPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return { title: "Kitaplar", component: <Books /> };
      case "2":
        return { title: "Ödünç Aldıklarım", component: <IBorrowed /> };
      case "3":
        return { title: "Ödünç Geçmişim", component: <BorrowHistory /> };
      case "4":
        return { title: "Ödemeler", component: <Payments /> };
      case "5":
        return { title: "Favorilerim", component: <Favorites /> };
      default:
        return { title: "Hesabım", component: <MyAccount /> };
    }
  };

  const { title, component } = renderContent();

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
        width={240}
      >
        <div className="text-white text-center py-6 font-bold text-xl border-b border-gray-700 tracking-wide">
          Kütüphane
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={(e) => handleMenuClick(e.key)}
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ paddingTop: "20px", fontSize: "16px" }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 20px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="text-3xl font-bold">{title}</h1>
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Avatar
              style={{ backgroundColor: "#1890ff", cursor: "pointer" }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </Header>
        <Content style={{ overflow: "auto" }}>
          <div
            style={{
              padding: 24,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {component}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#f9fafb",
            color: "#9ca3af",
            fontSize: "14px",
          }}
        >
          © {new Date().getFullYear()} Kütüphane Sistemi | Tüm Hakları Saklıdır.
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainPage;
