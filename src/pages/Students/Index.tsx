import { getStudents, addStudent, deleteStudent, updateStudent } from '@/services/api';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { FormattedMessage } from 'umi';
import { Button, Popconfirm, Tag } from 'antd';
import UpdateForm from './components/UpdateForm';
import { useRef, useState } from 'react';

const Books: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [currentModel, setCurrentModel] = useState<any>({});

  const [editVisible, setEditVisible] = useState<boolean>(false);

  const columns: Array<ProColumns<any>> = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      hideInSearch: true,
      render(model) {
        return model == '男' ? <Tag color="blue">男</Tag> : <Tag color="red">女</Tag>;
      },
    },
    {
      title: '班级',
      dataIndex: 'class',
      hideInSearch: true,
      render(model: any) {
        return `${model.name}-${model.year}`;
      },
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
                await deleteStudent(model.id);
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
          var { data, response } = await getStudents({
            $skip: (q.current - 1) * q.pageSize,
            $limit: q.pageSize,
            $search: q.name,
            '$sort[id]':-1
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
          if (value.id) {
            await updateStudent(value.id, value);
          } else {
            await addStudent(value);
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
