import React, { useContext } from "react";
import { Table } from "antd";
import { createStyles } from "antd-style";
import dayjs from "dayjs";
import { BorrowedBooksContext } from "../context/BorrowedBooksContext";

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

const IBorrowed = () => {
  const { styles } = useStyle();
  const { borrowedBooks, removeBorrowedBook, addToBorrowHistory } =
    useContext(BorrowedBooksContext);

  const updatedColumns = columns.map((item) => {
    if (item.key === "islemler") {
      return {
        ...item,
        render: (_, record) => (
          <button
            onClick={() => {
              removeBorrowedBook(record.key);
              addToBorrowHistory({
                ...record,
                iadeEdilenTarih: dayjs().format("YYYY-MM-DD"),
              });
              record.durum = "Mevcut";
            }}
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
        dataSource={borrowedBooks}
        scroll={{ y: 55 * 8 }}
      />
    </div>
  );
};

export default IBorrowed;
