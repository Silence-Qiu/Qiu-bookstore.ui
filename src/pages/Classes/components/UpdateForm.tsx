import React from 'react';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';
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
        width: '700px',
        onCancel: () => onCancel(),
        destroyOnClose: true,
      }}
      visible={visible}
      initialValues={model}
    >
      <ProFormText label="id" name="id" hidden={true} />
      <ProFormText
        labelCol={{ span: 3 }}
        label="名称"
        name="name"
        rules={[{ required: true }]}
      />
      <ProForm.Item
        labelCol={{ span: 3 }}
        label="年份"
        name="year"
        initialValue={new Date().getFullYear()}
      >
        <InputNumber style={{ width: '100%' }} />
      </ProForm.Item>
    </ModalForm>
  );
};

export default UpdateForm;
