import { getBooks, addBook, deleteBook, updateBook } from '@/services/api';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { FormattedMessage } from 'umi';
import { Button, Image, Popconfirm } from 'antd';
import moment from 'moment';
import UpdateForm from './components/UpdateForm';
import React, { useRef, useState } from 'react';

const Books: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [currentModel, setCurrentModel] = useState<any>({});

  const [editVisible, setEditVisible] = useState<boolean>(false);

  const columns: Array<ProColumns<any>> = [
    {
      title: '名称',
      dataIndex: 'name',
      width: '200px',
    },
    {
      title: '图片',
      dataIndex: 'image',
      width: '200px',
      hideInSearch:true,
      render: (_,v:any) => {
        return v.image ? <Image preview src={v.image}></Image> : '-';
      },
    },
    {
      title: '编号',
      dataIndex: 'number',
      hideInSearch: true,
    },
    {
      title: '价格',
      dataIndex: 'price',
      hideInSearch: true,
      render: (v: any) => v.toFixed(2),
    },
    {
      title: '类型',
      dataIndex: 'type',
      hideInSearch: true,
    },
    {
      title: '入库时间',
      dataIndex: 'storageTime',
      hideInSearch: true,
      render: (t: React.ReactNode) => moment(t!.toString()).format('yyyy-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'action',
      hideInSearch: true,
      width: '150px',
      render: (_, model) => {
        return (
          <>
            <Button
              type="link"
              onClick={(e) => {
                e.stopPropagation();
                var m = { ...model };
                m.storageTime = moment(model.storageTime);
                setCurrentModel(m);
                setEditVisible(true);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="删除这项吗?"
              onConfirm={async () => {
                await deleteBook(model.id);
                actionRef.current?.reload(false);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link">删除</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Keyword, any>
        rowKey="id"
        actionRef={actionRef}
        pagination={{ pageSizeOptions: [10, 20, 50, 100], defaultPageSize: 10 }}
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCurrentModel({});
              setEditVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={async (q) => {
          var { data, response } = await getBooks({
            $skip: (q.current - 1) * q.pageSize,
            $limit: q.pageSize,
            $search: q.name,
            '$sort[id]': -1,
          });
          return {
            data: data,
            total: parseInt(response.headers.get('x-count')!),
            pageSize: q.pageSize,
            current: q.current,
          };
        }}
      ></ProTable>

      <UpdateForm
        onOk={async (value: any) => {
          value.storageTime = moment(value.storageTime);
          if (value.id) {
            await updateBook(value.id, value);
          } else {
            await addBook(value);
          }
          setEditVisible(false);
          actionRef.current?.reload(false);
        }}
        model={currentModel}
        onCancel={() => setEditVisible(false)}
        visible={editVisible}
      />
    </PageContainer>
  );
};
export default Books;
