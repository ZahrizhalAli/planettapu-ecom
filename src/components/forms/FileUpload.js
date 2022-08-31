import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
  return (
    <>
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
