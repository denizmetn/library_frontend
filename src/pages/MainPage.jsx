import React, { useEffect, useMemo, useState } from "react";
import { Layout, Menu, theme, Dropdown, Avatar, Modal, Input } from "antd";
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
const { TextArea } = Input;

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

const MainPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState("1");
  const [address, setAddress] = useState("");
  const [savedAddress, setSavedAddress] = useState("");
  const [open, setOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const renderContent = useMemo(() => {
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
  }, [selectedKey]);
  const { title, component } = renderContent;

  useEffect(() => {
    const storedAddress = localStorage.getItem("savedAddress");
    if (storedAddress) {
      setSavedAddress(storedAddress);
      setAddress(storedAddress);
    }
  }, []);

  const handleSave = () => {
    setSavedAddress(address);
    localStorage.setItem("savedAddress", address);
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleMenuClick = (menuKey) => {
    setSelectedKey(menuKey);
  };

  const userMenu = (
    <Menu>
      <Menu.Item icon={<SettingOutlined />} onClick={openModal}>
        Ayarlar
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />}>
        <a href="/">Çıkış</a>
      </Menu.Item>
    </Menu>
  );

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
            padding: " 20px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#f9fafb",
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
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          © {currentYear} Kütüphane Sistemi | Tüm Hakları Saklıdır.
        </Footer>
      </Layout>
      <Modal
        title="AYARLAR"
        centered
        open={open}
        onCancel={closeModal}
        width={600}
        footer={null}
      >
        <div className="space-y-6">
          <div>
            <h1 className="text-lg font-medium text-gray-800">Ad Soyad</h1>
            <div className="border border-gray-300 bg-white rounded-md shadow-sm w-full h-10 flex items-center px-4 text-gray-700">
              Tuna Bozlak
            </div>
          </div>

          <div>
            <h1 className="text-lg font-medium text-gray-800">E-Posta</h1>
            <div className="border border-gray-300 bg-white rounded-md shadow-sm w-full h-10 flex items-center px-4 text-gray-700">
              a@gmail.com
            </div>
          </div>

          <div>
            <h1 className="text-lg font-medium text-gray-800">Adres</h1>
            <TextArea
              placeholder="Adres giriniz..."
              className="border border-gray-300 rounded-md shadow-sm"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full shadow-sm hover:bg-blue-600 transition-colors duration-300 mt-4"
              onClick={handleSave}
            >
              Kaydet
            </button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};
export default MainPage;
