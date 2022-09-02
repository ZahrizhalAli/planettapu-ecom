import React from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Meta } = Card;

function AdminProductCard({ handleRemove, product, defaultImage }) {
  const { title, description, images, slug } = product;

  return (
    <>
      <Card
        cover={
          <img src={images && images.length ? images[0].url : defaultImage} />
        }
        style={{ height: '150px', objectFit: 'cover' }}
        className="m-2"
        actions={[
          <Link to={`/admin/product/${slug}`}>
            <EditOutlined />
          </Link>,
          <DeleteOutlined
            onClick={() => handleRemove(slug)}
            className="text-danger"
          />,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 50)}...`}
        />
      </Card>
    </>
  );
}

export default AdminProductCard;
