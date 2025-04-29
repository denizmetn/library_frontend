import React, { useState } from "react";
import { Table } from "antd";
import { createStyles } from "antd-style";
import dayjs from "dayjs";
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body
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
    title: "Başlangic Tarihi",
    dataIndex: "baslangicTarihi",
    render: (date) => dayjs(date).format("DD/MM/YYYY"),
    width: 100,
  },
  {
    title: "Bitiş Tarihi",
    dataIndex: "bitisTarihi",
    render: (date) => dayjs(date).format("DD/MM/YYYY"),
    width: 100,
  },
  {
    title: "İşlemler",
    key: "islemler",
    width: 100,
    render: (_, record) => (
      <button
        onClick={() => alert(`${record.kitapAdi} kitabı iade edilecek!`)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        İade Et
      </button>
    ),
  },
];
const dataSource = Array.from({ length: 100 }).map((_, i) => ({
  key: i,
  kitapAdi: `Yaprak Dökümü ${i}`,
  yazarAdi: "Reşat Nuri Güntekin",
  tur: "Roman",
  baslangicTarihi: dayjs().subtract(i, "day").toDate(),
  bitisTarihi: dayjs()
    .add(i + 5, "day")
    .toDate(),
}));
const IBorrowed = () => {
  const { styles } = useStyle();
  const [data, setData] = useState(dataSource);

  const handleReturn = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const updatedColumns = columns.map((item) => {
    if (item.key === "islemler") {
      return {
        ...item,
        render: (_, record) => (
          <button
            onClick={() => handleReturn(record.key)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            İade Et
          </button>
        ),
      };
    }
    return item;
  });

  return (
    <div className="flex flex-col gap-8">
      <Table
        className={styles.customTable}
        columns={updatedColumns}
        dataSource={data}
        scroll={{ y: 55 * 7.81 }}
      />
    </div>
  );
};

export default IBorrowed;
