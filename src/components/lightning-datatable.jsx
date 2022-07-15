
import React from 'react'
import "antd/dist/antd.css";
import { Table } from 'antd';
import {useState,useEffect} from 'react'
import moment from 'moment';
function LightningDatatable(props) {
  const columns = [
      {
          title: 'Date',
          dataIndex: 'time',
          key:'time',
          render:(text)=>moment(text).format("DD MMM, YYYY HH:MM:SS")
      },
      {
          title: 'Intensity',
          dataIndex: 'intensity',
          key: 'intensity'
      },
      {
          title: 'Cloud to cloud',
          dataIndex: 'isCloudToCloud',
          key: 'isCloudToCloud',
          render: (text)=>String(text)
      },
  ];
  return (
      <div style={{
        width: 600, padding: 30
      }}>
          <h4>Lightning Datatable</h4>
          <Table pagination={{pageSize:5}} dataSource={props.dataSource} columns={columns} rowKey="intensity"/>
      </div>
  );
}
export default LightningDatatable