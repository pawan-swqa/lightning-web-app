import React from "react";
import "antd/dist/antd.css";
import { Table } from "antd";
import moment from "moment";

function LightningDatatable(props) {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      props.onRowSelection(selectedRows);
    },
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "time",
      key: "time",
      render: (text) => moment(text).format("DD MMM, YYYY HH:MM:SS"),
    },
    {
      title: "Intensity",
      dataIndex: "intensity",
      key: "intensity",
    },
    {
      title: "Cloud to cloud",
      dataIndex: "isCloudToCloud",
      key: "isCloudToCloud",
      render: (text) => String(text),
    },
  ];
  return (
    <div
      style={{
        width: 600,
      }}
    >
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        pagination={{ pageSize: 6, showSizeChanger: false }}
        dataSource={props.dataSource}
        columns={columns}
        rowKey="intensity"
      />
    </div>
  );
}
export default LightningDatatable;
