import {
  getStudentBorrowBooks,
  addStudentBorrowBook,
  deleteStudentBorrowBook,
  returnStudentBorrowBook,
} from '@/services/api';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { FormattedMessage } from 'umi';
import { Button, Popconfirm, Tag } from 'antd';
import UpdateForm from './components/UpdateForm';
import { useRef, useState } from 'react';
import moment from 'moment';

const Books: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [currentModel, setCurrentModel] = useState<any>({});

  const [editVisible, setEditVisible] = useState<boolean>(false);

  const columns: Array<ProColumns<any>> = [
    {
      title: '学生',
      dataIndex: 'student',
      formItemProps: {
        label: '学生/书籍',
      },
      render(student: any) {
        return `${student.name}-${student.class.name}-${student.class.year}`;
      },
    },
    {
      title: '书籍',
      dataIndex: 'book',
      hideInSearch: true,
      render(book: any) {
        return `${book.name}-${book.number}`;
      },
    },
    {
      title: '数量',
      dataIndex: 'count',
      hideInSearch: true,
    },
    {
      title: '借书时间',
      dataIndex: 'lendTime',
      hideInSearch: true,
      render(lendTime: any) {
        return moment(lendTime).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '还书时间',
      dataIndex: 'returnTime',
      hideInSearch: true,
      render(returnTime: any) {
        return returnTime == '-' ? returnTime : moment(returnTime).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '归还情况',
      valueType: 'select',
      valueEnum: {
        0: '未归还',
        1: '已归还',
      },
     
      dataIndex: 'status',
      render(_, r) {
        return r.status ? <Tag color="green">已归还</Tag> : <Tag color="pink">未归还</Tag>;
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
            <Popconfirm
              disabled={model.status}
              title="确定一下?"
              onConfirm={async () => {
                await returnStudentBorrowBook(model.id);
                actionRef.current?.reload(false);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" disabled={model.status}>
                归还
              </Button>
            </Popconfirm>

            <Popconfirm
              title="删除这项吗?"
              onConfirm={async () => {
                await deleteStudentBorrowBook(model.id);
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
          var data = await getStudentBorrowBooks({
            skip: (q.current - 1) * q.pageSize,
            limit: q.pageSize,
            search: q.student,
            status: q.status,
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
          await addStudentBorrowBook(value);
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
