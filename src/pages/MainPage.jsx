import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import {
  UserOutlined,
  HistoryOutlined,
  ReadOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Hesabim from "./Hesabim";
import Kitaplar from "./Kitaplar";
import OduncAldiklarim from "./OduncAldiklarim";
import OduncGecmisim from "./OduncGecmisim";
import RezerveEtme from "./RezerveEtme";
import OkumaListesi from "./OkumaListesi";
import Favorilerim from "./Favorilerim";

const { Header, Content, Footer, Sider } = Layout;
const menuItems = [
  { key: "1", icon: <UserOutlined />, label: "Hesabım", route: "/hesabim" },
  {
    key: "2",
    icon: <AppstoreOutlined />,
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
    icon: <CalendarOutlined />,
    label: "Rezerve Etme",
  },
  {
    key: "6",
    icon: <UnorderedListOutlined />,
    label: "Okuma Listelerim",
  },

  {
    key: "7",
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
        return <Hesabim />;
      case "2":
        return <Kitaplar />;
      case "3":
        return <OduncAldiklarim />;
      case "4":
        return <OduncGecmisim />;
      case "5":
        return <RezerveEtme />;
      case "6":
        return <OkumaListesi />;
      case "7":
        return <Favorilerim />;
      default:
        return <MainPage />;
    }
  };

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          background: "#001529",
        }}
        width={250}
      >
        <div className="text-white text-center py-4 font-bold text-lg border-b border-gray-700">
          Kütüphane Sistemi
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={(e) => handleMenuClick(e.key)}
          selectedKeys={[selectedKey]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: "#f0f2f5",
            display: "flex",
            alignItems: "center",
            fontSize: "18px",
            fontWeight: "500",
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
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: "center", background: "#fafafa" }}>
          © {new Date().getFullYear()} Kütüphane Sistemi | Tüm Hakları Saklıdır.
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainPage;
