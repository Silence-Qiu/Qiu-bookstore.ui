import React from 'react';
import { Image } from 'antd';

export type ImgaeContainerProps = {
  images: any[];
  visible: boolean;
  setVisible: Function;
};

var ImageContainer: React.FC<ImgaeContainerProps> = (props) => {
  return (
    <>
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{ visible: props.visible, onVisibleChange: (v) => props.setVisible(v) }}
        >
          {props.images.map((x) => (
            <Image src={x} />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};
export default ImageContainer;
