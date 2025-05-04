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
          ${antCls}-table-body {
            ${antCls}-table-content {
              scrollbar-width: thin;
              scrollbar-color: #eaeaea transparent;
              scrollbar-gutter: stable;
            }
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
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const fetchBorrowedBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/borrows/all`);
      const books = response.data.map((borrow) => ({
        key: borrow.id,
        kitapAdi: borrow.bookTitle,
        yazarAdi: borrow.bookAuthor,
        tur: borrow.bookCategory,
        baslangicTarihi: borrow.startDate,
        bitisTarihi: borrow.endDate,
      }));
      setBorrowedBooks(books);
    } catch (error) {
      console.error("Ödünç alınan kitaplar alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const handleReturn = async (borrowId) => {
    try {
      const returnedBook = borrowedBooks.find((book) => book.key === borrowId);

      const payload = {
        borrowId,
        title: returnedBook.kitapAdi,
        author: returnedBook.yazarAdi,
        category: returnedBook.tur,
        receivedDate: returnedBook.baslangicTarihi,
        returnedDate: returnedBook.bitisTarihi,
      };
      await axios.post("http://localhost:8081/borrowHistory/create", payload);
      await axios.put("http://localhost:8081/borrows/return", { borrowId });

      setBorrowedBooks((prev) => prev.filter((book) => book.key !== borrowId));
      alert("Kitap başarıyla iade edildi.");
    } catch (error) {
      console.error("Kitap iade edilirken hata oluştu:", error);
      alert("Kitap iade edilirken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

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
          onClick={() => handleReturn(record.key)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          İade Et
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={borrowedBooks}
        scroll={{ y: 55 * 8 }}
      />
    </div>
  );
};

export default IBorrowed;
