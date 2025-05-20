import React, { useContext, useState } from "react";
import { Modal, Table } from "antd";
import { createStyles } from "antd-style";
import { BorrowedBooksContext } from "../context/BorrowedBooksContext";

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
      title: "Stok Durumu",
      dataIndex: "durum",
      render: (durum) => (
        <span
          style={{
            color: durum === "Mevcut Değil" ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {durum || "Mevcut"}
        </span>
      ),
      width: 150,
    },
    {
      title: "İşlemler",
      key: "islemler",
      width: 100,
      render: (_, record) => (
        <button
          onClick={() => openModal(record.key)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Ödünç al
        </button>
      ),
    },
  ];

  const { styles } = useStyle();
  const { favoriteBooks, addBorrowedBook } =
    useContext(BorrowedBooksContext) || {};
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const openModal = (bookKey) => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setStartDate(formattedDate);
    const book = favoriteBooks.find((book) => book.key === bookKey);
    setSelectedBook(book);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const handleBorrow = (e) => {
    e.preventDefault();
    const bitisTarihi = e.target.bitistarihi.value;
    if (!addBorrowedBook) {
      console.error(
        "addBorrowedBook function is not available in the context."
      );
      return;
    }
    if (selectedBook && bitisTarihi) {
      addBorrowedBook({
        ...selectedBook,
        baslangicTarihi: startDate,
        bitisTarihi,
        durum: "Mevcut Değil",
      });
      closeModal();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={favoriteBooks}
        scroll={{ y: 55 * 8 }}
      />
      <Modal
        title="Kitap Ödünç Alındı"
        centered
        open={open}
        onCancel={closeModal}
        width={600}
        footer={null}
      >
        <form className="space-y-8" onSubmit={handleBorrow}>
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

export default Favorites;
