import React, { useState } from "react";
import { Table, Input, Select } from "antd";
import { createStyles } from "antd-style";
import { StarOutlined } from "@ant-design/icons";
import { Button, Flex, Modal } from "antd";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const Books = () => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState("");

  const handleBorrow = (key) => {
    console.log(`Kitap ${key} ödünç alındı.`);
    openModal();
  };

  const openModal = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setStartDate(formattedDate);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Kitap Adı",
      dataIndex: "kitapadi",
      width: 150,
    },

    {
      title: "Yazar Adı",
      dataIndex: "yazaradi",
      width: 200,
    },
    {
      title: "Tür",
      dataIndex: "tür",
      width: 150,
    },

    {
      title: "İşlem",
      key: "action",
      width: 150,
      render: (_, record) => (
        <button
          onClick={() => handleBorrow(record.key)}
          style={{
            backgroundColor: "#1890ff",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Ödünç Al
        </button>
      ),
    },

    {
      title: "Favori",
      key: "favorite",
      width: 100,
      render: (_, record) => (
        <span
          onClick={() => handleFavorite(record.key)}
          style={{
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          <StarOutlined
            style={{
              color: record.isFavorite ? "gold" : "gray",
              fill: record.isFavorite ? "gold" : "none",
            }}
          />
        </span>
      ),
    },
    {
      title: "Stok Durumu",
      dataIndex: "durum",
      width: 150,
    },
  ];

  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      kitapadi: "Sefiller",
      yazaradi: "Victor Hugo",
      tür: "Roman",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 2,
      kitapadi: "1984",
      yazaradi: "George Orwell",
      tür: "Bilim Kurgu",
      isFavorite: false,
      durum: "Tükenmiş",
    },
    {
      key: 3,
      kitapadi: "Suç ve Ceza",
      yazaradi: "Fyodor Dostoyevski",
      tür: "Roman",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 4,
      kitapadi: "Hayvan Çiftliği",
      yazaradi: "George Orwell",
      tür: "Bilim Kurgu",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 5,
      kitapadi: "Kürk Mantolu Madonna",
      yazaradi: "Sabahattin Ali",
      tür: "Roman",
      isFavorite: false,
      durum: "Tükenmiş",
    },
    {
      key: 6,
      kitapadi: "Beyaz Zambaklar Ülkesinde",
      yazaradi: "Grigory Petrov",
      tür: "Tarih",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 7,
      kitapadi: "Nutuk",
      yazaradi: "Mustafa Kemal Atatürk",
      tür: "Tarih",
      isFavorite: false,
      durum: "Mevcut",
    },

    {
      key: 8,
      kitapadi: "Dune",
      yazaradi: "Frank Herbert",
      tür: "Bilim Kurgu",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 9,
      kitapadi: "Yüzüklerin Efendisi",
      yazaradi: "J.R.R. Tolkien",
      tür: "Fantastik",
      isFavorite: false,
      durum: "Tükenmiş",
    },
    {
      key: 8,
      kitapadi: "Dune",
      yazaradi: "Frank Herbert",
      tür: "Bilim Kurgu",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 9,
      kitapadi: "Yüzüklerin Efendisi",
      yazaradi: "J.R.R. Tolkien",
      tür: "Fantastik",
      isFavorite: false,
      durum: "Tükenmiş",
    },
    {
      key: 10,
      kitapadi: "Harry Potter ve Felsefe Taşı",
      yazaradi: "J.K. Rowling",
      tür: "Fantastik",
      isFavorite: false,
      durum: "Mevcut",
    },
  ]);

  const [filteredData, setFilteredData] = useState(dataSource);
  const [searchText, setSearchText] = useState("");
  const [selectedTür, setSelectedTür] = useState("");

  const handleFavorite = (key) => {
    const updatedData = dataSource.map((item) =>
      item.key === key ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setDataSource(updatedData);
    setFilteredData(updatedData);
  };

  const handleSearch = (value) => {
    const filtered = dataSource.filter(
      (item) =>
        item.kitapadi.toLowerCase().includes(value.toLowerCase()) ||
        item.yazaradi.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(
      selectedTür
        ? filtered.filter((item) => item.tür === selectedTür)
        : filtered
    );
    setSearchText(value);
  };

  const handleTürChange = (value) => {
    const filtered = dataSource.filter((item) =>
      searchText
        ? (item.kitapadi.toLowerCase().includes(searchText.toLowerCase()) ||
            item.yazaradi.toLowerCase().includes(searchText.toLowerCase())) &&
          (!value || item.tür === value)
        : !value || item.tür === value
    );
    setFilteredData(filtered);
    setSelectedTür(value);
  };

  const { styles } = useStyle();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-extrabold">KİTAPLAR</h1>
      <div style={{ marginBottom: 16, display: "flex", gap: "10px" }}>
        <Input
          placeholder="Kitap veya Yazar Adı Ara"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: "300px" }}
        />
        <Select
          placeholder="Tür Seçin"
          onChange={handleTürChange}
          allowClear
          style={{ width: "200px" }}
        >
          <Option value="Roman">Roman</Option>

          <Option value="Bilim Kurgu">Bilim Kurgu</Option>
          <Option value="Fantastik">Fantastik</Option>
          <Option value="Tarih">Tarih</Option>
        </Select>
      </div>

      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 55 * 9.5 }}
      />

      <Modal
        title="Kitap Ödünç Alındı"
        centered
        open={open}
        onCancel={closeModal}
        width={600}
        footer={null}
      >
        <form className="space-y-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="baslangıctarihi"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Başlangıç Tarihi
                </label>
                <input
                  id="baslangıctarihi"
                  type="date"
                  value={startDate}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  readOnly
                />
              </div>

              <div>
                <label
                  htmlFor="bitistarihi"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Bitiş Tarihi
                </label>
                <input
                  id="bitistarihi"
                  type="date"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                />

                <div className="flex">
                  <button class=" cursor-pointer mt-4 ml-auto bg-blue-500 text-white px-8 py-2 rounded-lg">
                    Ödünç Al
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Books;
