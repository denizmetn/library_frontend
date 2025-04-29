import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
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
/*const dataSource = Array.from({ length: 100 }).map((_, i) => ({
  key: i,
  kitapAdi: `Yaprak Dökümü ${i}`,
  yazarAdi: "Reşat Nuri Güntekin",
  tur: "Roman",
  baslangicTarihi: dayjs().subtract(i, "day").toDate(),
  bitisTarihi: dayjs()
    .add(i + 5, "day")
    .toDate(),
}));*/
const IBorrowed = () => {
  const { styles } = useStyle();
  const [borrowedBooks, setBorrewodBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await fetch("#");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBorrewodBooks(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error("Ödünç alınan kitapları çekerken hata oluştu:", error);
      }
    };
    fetchBorrowedBooks();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Kitaplar yükleniyor..." />
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-red-500">
        Veri çekilirken bir hata oluştu: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold ">Ödünç Alınan Kitaplar</h1>
      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={borrowedBooks}
        scroll={{ y: 55 * 7.81 }}
      />
    </div>
  );
};
export default IBorrowed;
