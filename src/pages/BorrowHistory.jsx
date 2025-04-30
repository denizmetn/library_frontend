import React from "react";
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
    width: 150,
  },
  {
    title: "Tür",
    dataIndex: "tur",
    width: 100,
  },
  {
    title: "Alınan Tarih",
    dataIndex: "alinanTarih",
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

const BorrowHistory = () => {
  const { styles } = useStyle();
  return (
    <div className="flex flex-col gap-8">
      <Table
        className={styles.customTable}
        columns={columns}
        scroll={{ y: 55 * 8 }}
      />
    </div>
  );
};
export default BorrowHistory;
