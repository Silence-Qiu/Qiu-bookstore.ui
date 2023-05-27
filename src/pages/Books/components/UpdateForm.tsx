import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import ProForm, { ModalForm, ProFormDateTimePicker, ProFormText } from '@ant-design/pro-form';
import { Button, FormInstance, Image, InputNumber, Upload, message } from 'antd';

interface Props {
  visible: boolean;
  model: any;
  onCancel: () => void;
  onOk: (m: any) => Promise<void>;
}

const UpdateForm: React.FC<Props> = ({ visible, model, onCancel, onOk }) => {

  const formRef = useRef<FormInstance<{ [key: string]: any }>>();

  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    setImage(model.image);
  }, [model.image]);

  return (
    <ModalForm<{ [key: string]: any }>
      formRef={formRef}
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
      <ProFormText labelCol={{ span: 3 }} label="名称" name="name" rules={[{ required: true }]} />
      <ProFormText labelCol={{ span: 3 }} label="编号" name="number" />
      <ProForm.Item labelCol={{ span: 3 }} label="价格" name="price" initialValue={0}>
        <InputNumber style={{ width: '100%' }} step={0.01} />
      </ProForm.Item>
      <ProFormText labelCol={{ span: 3 }} label="类型" name="type" />

      <ProForm.Item labelCol={{ span: 3 }} label="图片" name="image" required>
        <Upload
          name="file"
          action="/api/images"
          maxCount={1}
          onChange={(info) => {
            console.log(info);

            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);

              formRef.current?.setFieldsValue({
                image: info.file.response.url,
              });

              setImage(formRef.current?.getFieldValue('image'));
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
        >
          <Button type="link">点击上传</Button>
        </Upload>
        <Image width="300px" preview src={image}></Image>
      </ProForm.Item>
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
