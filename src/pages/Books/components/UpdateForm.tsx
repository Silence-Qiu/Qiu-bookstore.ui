import React from 'react';
import moment from 'moment';
import ProForm, { ModalForm, ProFormDateTimePicker, ProFormText } from '@ant-design/pro-form';
import { InputNumber } from 'antd';

interface Props {
  visible: boolean;
  model: any;
  onCancel: () => void;
  onOk: (m: any) => Promise<void>;
}

const UpdateForm: React.FC<Props> = ({ visible, model, onCancel, onOk }) => {
  return (
    <ModalForm<any>
      title={model.id ? '编辑' : '新增'}
      onFinish={onOk}
      modalProps={{
        width:'700px',
        onCancel: () => onCancel(),
        destroyOnClose: true,
      }}
      visible={visible}
      initialValues={model}
    >
      <ProFormText label="id" name="id" hidden={true} />
      <ProFormText labelCol={{ span: 3 }} label="名称" name="name" rules={[{ required: true }]} />
      <ProFormText labelCol={{ span: 3 }} label="编号" name="number" />
      <ProForm.Item labelCol={{ span: 3 }} label="价格" name="price" initialValue={0}>
        <InputNumber style={{ width: '100%' }} step={0.01} />
      </ProForm.Item>
      <ProFormText labelCol={{ span: 3 }} label="类型" name="type" />
      <ProFormDateTimePicker
        labelCol={{ span: 3 }}
        rules={[{ required: true }]}
        fieldProps={{
          style: {
            width: '100%',
          },
        }}
        label="入库时间"
        name="storageTime"
        initialValue={moment()}
      />
    </ModalForm>
  );
};

export default UpdateForm;
