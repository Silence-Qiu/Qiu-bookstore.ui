import { getClasses, addClass, deleteClass, updateClass } from '@/services/api';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { FormattedMessage } from 'umi';
import { Button, Popconfirm } from 'antd';
import UpdateForm from './components/UpdateForm';
import { useRef, useState } from 'react';

const Books: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [currentModel, setCurrentModel] = useState<any>({});

  const [editVisible, setEditVisible] = useState<boolean>(false);

  const columns: Array<ProColumns<any>> = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '年份',
      dataIndex: 'year',
      hideInSearch: true,
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
              onClick={() => {
                var m = { ...model };
                setCurrentModel(m);
                setEditVisible(true);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="删除这项吗?"
              onConfirm={async () => {
                await deleteClass(model.id);
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
        pagination={{ pageSizeOptions: [10, 20, 50, 100], defaultPageSize: 100 }}
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
          var data = await getClasses({
            skip: (q.current - 1) * q.pageSize,
            limit: q.pageSize,
            search:q.name
          });
          return {
            data: data.list,
            total: data.total,
            pageSize: q.pageSize,
            current: q.current,
          };
        }}
      ></ProTable>

      <UpdateForm
        onOk={async (value: any) => {
          if (value.id) {
            await updateClass(value.id, value);
          } else {
            await addClass(value);
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
