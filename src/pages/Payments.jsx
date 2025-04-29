import React from "react";
import { Alert, Table } from 'antd';
import { createStyles } from 'antd-style';
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
const columns = [
  {
    title: 'Kitap Adı',
    dataIndex: 'kitapAdi',
    width: 150,
  },
  {
    title: 'Yazar Adı',
    dataIndex: 'yazarAdi',
    width: 200,
  },
  {
    title: 'Geciken Gün Sayısı',
    dataIndex: 'gecikenGun',
    width: 100,
  },
  {
    title: "Toplam Borç",
    dataIndex:"borc",
    width:100,
  },

  {
    title: 'İşlemler',
    key: 'islemler',
    width: 100,
    render:(_,record)=>(
      <button
      onClick={()=>alert(`${record.kitapAdi} Ödeme yap`)}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
        Ödeme Yap
      </button>
    )
  }
];
const dataSource = Array.from({ length: 100 }).map((_, i) => ({
  key: i,
  kitapAdi: `Yaprak Dökümü ${i}`,
  yazarAdi: `Neşat Nuri GÜNTEKİN ${i}`,
  gecikenGun: ` ${i}`,
  borc: `${i}`,
}));
const Payments = () => {
  const { styles } = useStyle();
    return (
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">
          Ödemeler
        </h1>
        <Table
        className={styles.customTable}
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: 55 * 7.81 }}
      />
      </div>
    );
};
export default Payments;
