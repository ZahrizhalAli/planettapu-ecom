import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';
import { removeImage } from '../../functions/cloudinary';

function FileUpload({ values, setValues, setLoading }) {
  const { user } = useSelector((state) => ({ ...state }));

  function fileUploadAndResize(e) {
    // console.log(e.target.files);
    // Resize Image
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true); // Is Loading.
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (url) => {
            // console.log(url);
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_API}/uploadimages`,
                {
                  images: url,
                },
                {
                  headers: {
                    authtoken: user ? user.token : '',
                  },
                }
              )
              .then((res) => {
                console.log('IMAGE UPLOAD RES DATA', res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log('CLOUDINARY ERROR', err);
              });
          },
          'base64'
        );
      }
    }
    // Send back to server to upload to cloudinary
    // Set url to image[] in the parent component
  }

  function handleRemoveImage(id) {
    //
    setLoading(true);
    // console.log(id);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/removeimages`,
        {
          public_id: id,
        },
        {
          headers: {
            authtoken: user ? user.token : '',
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setLoading(false);
        // remove image with public id from images values
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== id;
        });

        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => {
            return (
              <Badge
                count="X"
                key={image.public_id}
                onClick={() => handleRemoveImage(image.public_id)}
                stle={{ cursor: 'pointer' }}
              >
                <Avatar
                  key={image.public_id}
                  src={image.url}
                  size={60}
                  shape="square"
                  className="ml-3 m-1"
                />
              </Badge>
            );
          })}
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised">
          Choose Images
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
}

export default FileUpload;
