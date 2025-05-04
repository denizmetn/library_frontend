import React, { useContext, useEffect, useState } from "react";
import { Table } from "antd";
import { createStyles } from "antd-style";
import dayjs from "dayjs";
import axios from "axios";

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

const BorrowHistory = () => {
  const columns = [
    {
      title: "Kitap Adı",
      dataIndex: "kitapAdi",
      width: 150,
    },
    {
      title: "Yazar Adı",
      dataIndex: "yazarAdi",
      width: 150,
    },
    {
      title: "Tür",
      dataIndex: "tur",
      width: 100,
    },
    {
      title: "Alınan Tarih",
      dataIndex: "baslangicTarihi",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
      width: 100,
    },
    {
      title: "İade Edilen Tarih",
      dataIndex: "iadeEdilenTarih",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
      width: 100,
    },
  ];
  const { styles } = useStyle();

  const [borrowedBooksHistory, setBorrowedBooksHistory] = useState([]);

  const fetchBorrowedBooksHistory = async (borrowId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/borrowHistory/all`
      );

      const books = response.data.map((borrow) => ({
        key: borrow.id,
        kitapAdi: borrow.borrowTitle,
        yazarAdi: borrow.borrowAuthor,
        tur: borrow.borrowCategory,
        baslangicTarihi: borrow.receivedDate,
        iadeEdilenTarih: borrow.returnedDate,
      }));
      setBorrowedBooksHistory(books);
    } catch (error) {
      console.error("Ödünç alınan kitaplar alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchBorrowedBooksHistory();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={borrowedBooksHistory}
        scroll={{ y: 55 * 8 }}
      />
    </div>
  );
};

export default BorrowHistory;
