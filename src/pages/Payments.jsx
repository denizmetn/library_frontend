import React, { useState, useContext, useEffect } from "react";
import { Table, Modal, Form, Input } from "antd";
import { createStyles } from "antd-style";
import { BorrowedBooksContext } from "../context/BorrowedBooksContext"; // Import context
import dayjs from "dayjs"; // Import dayjs

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

const Payments = () => {
  const { styles } = useStyle();
  const [odemeModalVisible, setOdemeModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();
  const { calculateOverdueFines } = useContext(BorrowedBooksContext);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchOverdueBooks = async () => {
      try {
        const overdueBooks = await calculateOverdueFines();
        const today = dayjs();
        const booksWithFines = overdueBooks.map((book) => {
          const dueDate = dayjs(book.bitisTarihi);
          const overdueDays = today.isAfter(dueDate)
            ? today.diff(dueDate, "day")
            : 0;
          return {
            ...book,
            gecikenGun: overdueDays,
            borc: overdueDays * 10, // 10 TL per overdue day
          };
        });
        const storedData =
          JSON.parse(localStorage.getItem("paidRecords")) || [];
        const filteredBooks = booksWithFines.filter(
          (book) => !storedData.includes(book.key)
        );
        setDataSource(filteredBooks);
      } catch (error) {
        console.error("Error fetching overdue books:", error);
        setDataSource([]);
      }
    };

    fetchOverdueBooks();
  }, [calculateOverdueFines]);

  const showOdemeModal = (record) => {
    setSelectedRecord(record);
    form.resetFields();
    setOdemeModalVisible(true);
  };

  const handleOdemeModalOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Kart Bilgileri:", values);
      handleDelete();
      setOdemeModalVisible(false);
      Modal.success({
        title: "Ödeme Başarılı!",
        content: `${selectedRecord.kitapAdi} kitabı için ${selectedRecord.borc} ödeme alındı.`,
      });
    } catch (errorInfo) {
      console.log("Hatalı giriş:", errorInfo);
    }
  };

  const handleOdemeModalCancel = () => {
    setOdemeModalVisible(false);
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
      title: "Geciken Gün Sayısı",
      dataIndex: "gecikenGun",
      width: 100,
    },
    {
      title: "Toplam Borç",
      dataIndex: "borc",
      width: 100,
    },
    {
      title: "İşlemler",
      key: "islemler",
      width: 120,
      render: (_, record) => (
        <button
          onClick={() => showOdemeModal(record)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Ödeme Yap
        </button>
      ),
    },
  ];

  const handleDelete = () => {
    if (selectedRecord) {
      setDataSource((prevData) =>
        prevData.filter((item) => item.key !== selectedRecord.key)
      );
      const storedData = JSON.parse(localStorage.getItem("paidRecords")) || [];
      localStorage.setItem(
        "paidRecords",
        JSON.stringify([...storedData, selectedRecord.key])
      );
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Modal
        title="Kart Bilgileri ile Ödeme"
        open={odemeModalVisible}
        onOk={handleOdemeModalOk}
        onCancel={handleOdemeModalCancel}
        okText="Ödemeyi Tamamla"
        cancelText="İptal"
      >
        {selectedRecord && (
          <div className="mb-4">
            <p>
              <strong>Kitap:</strong> {selectedRecord.kitapAdi}
            </p>
            <p>
              <strong>Borç:</strong> {selectedRecord.borc}
            </p>
          </div>
        )}

        <Form form={form} layout="vertical">
          <Form.Item
            label="Kart Numarası"
            name="cardNumber"
            rules={[
              { required: true, message: "Kart numarası gerekli" },
              {
                pattern: /^\d{16}$/,
                message: "Kart numarası 16 haneli olmalı",
              },
            ]}
          >
            <Input
              placeholder="1111 2222 3333 4444"
              type="text"
              inputMode="numeric"
              maxLength={16}
            />
          </Form.Item>

          <Form.Item label="Son Kullanma Tarihi" required>
            <div className="flex items-center gap-2">
              <Form.Item
                name="month"
                noStyle
                rules={[
                  { required: true, message: "Ay gerekli" },
                  {
                    pattern: /^(0[1-9]|1[0-2])$/,
                    message: "Geçerli ay: 01-12",
                  },
                ]}
              >
                <Input
                  placeholder="AA"
                  maxLength={2}
                  type="text"
                  inputMode="numeric"
                  style={{ width: "60px" }}
                />
              </Form.Item>
              <span>/</span>
              <Form.Item
                name="year"
                noStyle
                rules={[
                  { required: true, message: "Yıl gerekli" },
                  {
                    pattern: /^\d{2}$/,
                    message: "Geçerli yıl: YY",
                  },
                ]}
              >
                <Input
                  placeholder="YY"
                  maxLength={2}
                  type="text"
                  inputMode="numeric"
                  style={{ width: "60px" }}
                />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            label="CVV"
            name="cvv"
            rules={[
              { required: true, message: "CVV gerekli" },
              {
                pattern: /^\d{3}$/,
                message: "CVV 3 haneli olmalı",
              },
            ]}
          >
            <Input
              placeholder="123"
              type="text"
              inputMode="numeric"
              maxLength={3}
            />
          </Form.Item>

          <Form.Item
            label="İsim Soyisim"
            name="name"
            rules={[
              { required: true, message: "İsim gerekli" },
              {
                pattern: /^[A-Za-zÇçĞğİıÖöŞşÜü\s]+$/,
                min: 3,
                message: "Lütfen Geçerli bir isim giriniz.",
              },
            ]}
          >
            <Input placeholder="Ad Soyad" />
          </Form.Item>
        </Form>
      </Modal>

      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={dataSource} // Use updated dataSource
        scroll={{ y: 55 * 8 }}
      />
    </div>
  );
};

export default Payments;
