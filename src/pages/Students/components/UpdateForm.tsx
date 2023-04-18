import React from 'react';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { getClass, getClasses } from '@/services/api';

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
          const { list } = await getClasses({
            skip: 0,
            limit: 10,
            search: option.keyWords,
          });

          const result: any[] = list.map((x: any) => {
            return {
              label: `${x.name}-${x.year}`,
              value: x.id,
            };
          });

          if (!option.keyWords && model.classId && !result.some((x: any) => x.value == model.classId)) {
            const current = await getClass(model.classId);
            result.unshift({ label: `${current.name}-${current.year}`, value: current.id });
          }

          return result;
        }}
        labelCol={{ span: 3 }}
        label="班级"
        name="classId"
        rules={[{ required: true }]}
      ></ProFormSelect>
      <ProFormText labelCol={{ span: 3 }} label="姓名" name="name" rules={[{ required: true }]} />
      <ProFormSelect
        label="性别"
        labelCol={{ span: 3 }}
        name="gender"
        request={async () => {
          return [
            { label: '男', value: '男' },
            { label: '女', value: '女' },
          ];
        }}
      ></ProFormSelect>
    </ModalForm>
  );
};

export default UpdateForm;
