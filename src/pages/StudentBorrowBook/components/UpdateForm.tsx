import React from 'react';
import ProForm, {
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { getBooks, getStudents } from '@/services/api';
import moment from 'moment';
import { Store } from 'antd/lib/form/interface';
import { InputNumber } from 'antd';

interface Props {
  visible: boolean;
  model: Store;
  onCancel: () => void;
  onOk: (m: any) => Promise<void>;
}

const UpdateForm: React.FC<Props> = ({ visible, model, onCancel, onOk }) => {
  return (
    <ModalForm<any>
      title={model.id ? '编辑' : '新增'}
      onFinish={onOk}
      modalProps={{
        onCancel: () => onCancel(),
        destroyOnClose: true,
      }}
      visible={visible}
      initialValues={model}
    >
      <ProFormText labelCol={{ span: 3 }} label="id" name="id" hidden={true} />
      <ProFormSelect
        showSearch
        request={async (option) => {
          const { data } = await getStudents({
            $skip: 0,
            $limit: 10,
            $search: option.keyWords,
            '$sort[id]': -1,
          });
          return data.map((x: any) => {
            return {
              label: `${x.name}-${x.class.name}-${x.class.year}`,
              value: x.id,
            };
          });
        }}
        labelCol={{ span: 3 }}
        label="学生"
        name="studentId"
        rules={[{ required: true }]}
      ></ProFormSelect>
      <ProFormSelect
        label="书籍"
        labelCol={{ span: 3 }}
        name="bookId"
        showSearch
        rules={[{ required: true }]}
        request={async (option) => {
          const { data } = await getBooks({
            $skip: 0,
            $limit: 10,
            $search: option.keyWords,
            '$sort[id]': -1,
          });
          return data.map((x: any) => {
            return {
              label: `${x.name}-${x.number}`,
              value: x.id,
            };
          });
        }}
      ></ProFormSelect>
      <ProForm.Item
        labelCol={{ span: 3 }}
        label="数量"
        name="count"
        initialValue={1}
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </ProForm.Item>
      <ProFormDateTimePicker
        fieldProps={{
          style: {
            width: '100%',
          },
        }}
        label="借书时间"
        labelCol={{ span: 3 }}
        name="lendTime"
        initialValue={moment().format()}
        rules={[{ required: true }]}
      />
    </ModalForm>
  );
};

export default UpdateForm;
