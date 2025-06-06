import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import {
  UserOutlined,
  HistoryOutlined,
  ReadOutlined,
  BookOutlined,
  CreditCardOutlined,
  StarOutlined,
} from "@ant-design/icons";
import MyAccount from "./MyAccount";
import Books from "./Books";
import IBorrowed from "./IBorrowed";
import BorrowHistory from "./BorrowHistory";
import Payments from "./Payments";
import Favorites from "./Favorites";

const { Header, Content, Footer, Sider } = Layout;
const menuItems = [
  { key: "1", icon: <UserOutlined />, label: "Hesabım" },
  {
    key: "2",
    icon: <BookOutlined />,
    label: "Kitaplar",
  },
  {
    key: "3",
    icon: <ReadOutlined />,
    label: "Ödünç Aldıklarım",
  },
  {
    key: "4",
    icon: <HistoryOutlined />,
    label: "Ödünç Geçmişim",
  },
  {
    key: "5",
    icon: <CreditCardOutlined />,
    label: "Ödemeler",
  },

  {
    key: "6",
    icon: <StarOutlined />,
    label: "Favorilerim",
  },
];

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
        return <MyAccount />;
      case "2":
        return <Books />;
      case "3":
        return <IBorrowed />;
      case "4":
        return <BorrowHistory />;
      case "5":
        return <Payments />;
      case "6":
        return <Favorites />;
      default:
        return <MainPage />;
    }
  };

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
            padding: "0 24px",
            background: "#f9fafb",
            display: "flex",
            alignItems: "center",
            fontSize: "22px",
            fontWeight: "600",
            color: "#374151",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {menuItems.find((item) => item.key === selectedKey)?.label}
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "auto" }}>
          <div
            style={{
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#f9fafb",
            color: "#9ca3af",
            fontSize: "14px",
            marginTop: "20px",
          }}
        >
          © {new Date().getFullYear()} Kütüphane Sistemi | Tüm Hakları Saklıdır.
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainPage;
