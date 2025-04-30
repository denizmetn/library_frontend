import React, { useState, useContext } from "react";
import { Table, Input, Select, Modal } from "antd";
import { createStyles } from "antd-style";
import { StarOutlined } from "@ant-design/icons";
import { BorrowedBooksContext } from "../context/BorrowedBooksContext"; // Import context

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

const Books = () => {
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
      width: 150,
    },

    {
      title: "İşlem",
      key: "islem",
      width: 150,
      render: (_, record) => (
        <button
          onClick={() => openModal(record.key)}
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
      key: "favori",
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

  const { addBorrowedBook } = useContext(BorrowedBooksContext) || {};
  if (!addBorrowedBook) {
    console.error("BorrowedBooksContext is not properly provided.");
    return <div>Error: Context not available</div>;
  }
  const [selectedBook, setSelectedBook] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      kitapAdi: "Sefiller",
      yazarAdi: "Victor Hugo",
      tur: "Roman",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 2,
      kitapAdi: "1984",
      yazarAdi: "George Orwell",
      tur: "Bilim Kurgu",
      isFavorite: false,
      durum: "Tükenmiş",
    },
    {
      key: 3,
      kitapAdi: "Suç ve Ceza",
      yazarAdi: "Fyodor Dostoyevski",
      tur: "Roman",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 4,
      kitapAdi: "Hayvan Çiftliği",
      yazarAdi: "George Orwell",
      tur: "Bilim Kurgu",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 5,
      kitapAdi: "Kürk Mantolu Madonna",
      yazarAdi: "Sabahattin Ali",
      tur: "Roman",
      isFavorite: false,
      durum: "Tükenmiş",
    },
    {
      key: 6,
      kitapAdi: "Beyaz Zambaklar Ülkesinde",
      yazarAdi: "Grigory Petrov",
      tur: "Tarih",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 7,
      kitapAdi: "Nutuk",
      yazarAdi: "Mustafa Kemal Atatürk",
      tur: "Tarih",
      isFavorite: false,
      durum: "Mevcut",
    },

    {
      key: 8,
      kitapAdi: "Dune",
      yazarAdi: "Frank Herbert",
      tur: "Bilim Kurgu",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 9,
      kitapAdi: "Yüzüklerin Efendisi",
      yazarAdi: "J.R.R. Tolkien",
      tur: "Fantastik",
      isFavorite: false,
      durum: "Tükenmiş",
    },

    {
      key: 10,
      kitapAdi: "Harry Potter ve Felsefe Taşı",
      yazarAdi: "J.K. Rowling",
      tur: "Fantastik",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 11,
      kitapAdi: "Don Kişot",
      yazarAdi: "Miguel de Cervantes",
      tur: "Roman",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 12,
      kitapAdi: "Savaş ve Barış",
      yazarAdi: "Lev Tolstoy",
      tur: "Roman",
      isFavorite: false,
      durum: "Tükenmiş",
    },
    {
      key: 13,
      kitapAdi: "Zaman Makinesi",
      yazarAdi: "H.G. Wells",
      tur: "Bilim Kurgu",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 14,
      kitapAdi: "Frankenstein",
      yazarAdi: "Mary Shelley",
      tur: "Bilim Kurgu",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 15,
      kitapAdi: "Yabancı",
      yazarAdi: "Albert Camus",
      tur: "Roman",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 16,
      kitapAdi: "Monte Cristo Kontu",
      yazarAdi: "Alexandre Dumas",
      tur: "Roman",
      isFavorite: false,
      durum: "Tükenmiş",
    },
    {
      key: 17,
      kitapAdi: "Dracula",
      yazarAdi: "Bram Stoker",
      tur: "Fantastik",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 18,
      kitapAdi: "Kayıp Zamanın İzinde",
      yazarAdi: "Marcel Proust",
      tur: "Roman",
      isFavorite: false,
      durum: "Tükenmiş",
    },
    {
      key: 19,
      kitapAdi: "Cesur Yeni Dünya",
      yazarAdi: "Aldous Huxley",
      tur: "Bilim Kurgu",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 20,
      kitapAdi: "Bir İdam Mahkumunun Son Günü",
      yazarAdi: "Victor Hugo",
      tur: "Roman",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 21,
      kitapAdi: "Moby Dick",
      yazarAdi: "Herman Melville",
      tur: "Roman",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 22,
      kitapAdi: "Uğultulu Tepeler",
      yazarAdi: "Emily Brontë",
      tur: "Roman",
      isFavorite: false,
      durum: "Tükenmiş",
    },
    {
      key: 23,
      kitapAdi: "Alice Harikalar Diyarında",
      yazarAdi: "Lewis Carroll",
      tur: "Fantastik",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 24,
      kitapAdi: "Denizler Altında Yirmi Bin Fersah",
      yazarAdi: "Jules Verne",
      tur: "Bilim Kurgu",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 25,
      kitapAdi: "Germinal",
      yazarAdi: "Émile Zola",
      tur: "Roman",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 26,
      kitapAdi: "Bülbülü Öldürmek",
      yazarAdi: "Harper Lee",
      tur: "Roman",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 27,
      kitapAdi: "Yeraltından Notlar",
      yazarAdi: "Fyodor Dostoyevski",
      tur: "Roman",
      isFavorite: false,
      durum: "Tükenmiş",
    },
    {
      key: 28,
      kitapAdi: "Körlük",
      yazarAdi: "José Saramago",
      tur: "Roman",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 29,
      kitapAdi: "Dorian Gray'in Portresi",
      yazarAdi: "Oscar Wilde",
      tur: "Roman",
      isFavorite: false,
      durum: "Mevcut",
    },
    {
      key: 30,
      kitapAdi: "Hayalet Hikayeleri",
      yazarAdi: "M.R. James",
      tur: "Fantastik",
      isFavorite: false,
      durum: "Mevcut",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [filteredData, setFilteredData] = useState(dataSource);
  const [searchText, setSearchText] = useState("");
  const [selectedTur, setSelectedTur] = useState("");

  const openModal = (key) => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setStartDate(formattedDate);
    setSelectedBook(dataSource.find((item) => item.key === key));
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

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
        item.kitapAdi.toLowerCase().includes(value.toLowerCase()) ||
        item.yazarAdi.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(
      selectedTur
        ? filtered.filter((item) => item.tur === selectedTur)
        : filtered
    );
    setSearchText(value);
  };

  const handleTurChange = (value) => {
    const filtered = dataSource.filter((item) =>
      searchText
        ? (item.kitapAdi.toLowerCase().includes(searchText.toLowerCase()) ||
            item.yazarAdi.toLowerCase().includes(searchText.toLowerCase())) &&
          (!value || item.tur === value)
        : !value || item.tur === value
    );
    setFilteredData(filtered);
    setSelectedTur(value);
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
      });
      closeModal();
    }
  };

  const { styles } = useStyle();
  const { Option } = Select;
  return (
    <div className="flex flex-col">
      <div className="space-y-6">
        <div className="flex gap-4 ">
          <Input
            placeholder="Kitap veya Yazar Adı Ara"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
            style={{ width: "300px" }}
          />
          <Select
            placeholder="Tür Seçin"
            onChange={handleTurChange}
            allowClear
            style={{ width: "200px" }}
          >
            <Select.Option value="Roman">Roman</Select.Option>
            <Select.Option value="Bilim Kurgu">Bilim Kurgu</Select.Option>
            <Select.Option value="Fantastik">Fantastik</Select.Option>
            <Select.Option value="Tarih">Tarih</Select.Option>
          </Select>
        </div>

        <Table
          className={styles.customTable}
          columns={columns}
          dataSource={filteredData}
          scroll={{ y: 50 * 7.85 }}
        />
      </div>

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
                  required
                />

                <div className="flex">
                  <button
                    type="submit"
                    className="cursor-pointer mt-4 ml-auto bg-blue-500 text-white px-8 py-2 rounded-lg"
                  >
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
