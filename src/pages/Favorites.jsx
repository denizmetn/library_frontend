import React, { useState } from "react";
import { Modal, Table } from "antd";
import { createStyles } from "antd-style";

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

const Favorites = () => {
  const { styles } = useStyle();

  const columns = [
    {
      title: "Kitap Adı",
      dataIndex: "kitapAdi",
      width: 150,
    },
    {
      title: "Yazar Adı",
      dataIndex: "yazarAdi",
      width: 200,
    },
    {
      title: "Tür",
      dataIndex: "tur",
      width: 100,
    },
    {
      title: "İşlemler",
      key: "islemler",
      width: 100,
      render: (_, record) => (
        <button
          onClick={(record) => alert(`${record.kitapAdi}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Ödünç al
        </button>
      ),
    },
  ];

  const dataSource = Array.from({ length: 100 }).map((_, i) => ({
    key: i,
    kitapAdi: `Yaprak Dökümü ${i}`,
    yazarAdi: `Neşat Nuri GÜNTEKİN ${i}`,
    tur: `Roman ${i}`,
  }));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Favoriler</h1>
      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: 55 * 7.81 }}
      />
    </div>
  );
};

export default Favorites;
