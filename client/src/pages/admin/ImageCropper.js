// ImageCropper.js
import { toast } from 'react-toastify';
import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from "../../context/AuthContext";

const B = styled.button`
  margin-left: auto;
  margin-right: auto;
  margin-top: 2px;
  display: block;
  font-size: 15px;
  padding: 2px;
  font-weight: bold;
  border-radius: 2px;
`;
const ImageCropper = ({ imageSrc, id }) => {
  const [auth] = useAuth();
  const cropperRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleSave = async () => {
    try {
      if (cropperRef.current && cropperRef.current.cropper) {
        const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();

        // Convert the canvas to a Blob
        return new Promise((resolve) => {
          croppedCanvas.toBlob((blob) => {
            resolve(blob);
          });
        });
      }
      return null;
    } catch (error) {
      console.error(error);
      throw new Error('Error getting cropped image blob');
    }
  };

  const uploadCroppedImage = async () => {
    try {
      const blob = await handleSave();

      if (blob) {
        const formData = new FormData();
        formData.append('photo', blob, 'cropped_image.png');

        const resp = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/saveuserphoto/${auth?.user?.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (resp.data.success === "true") {
          toast.success('Photo Updated');
          window.location.reload()
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Error uploading image');
    }
  };

  return (
    <div>
      <Cropper
        ref={cropperRef}
        src={imageSrc}
        style={{ height: '200px', width: '200px' }}
        aspectRatio={1}
        guides={true}
        viewMode={1}
        dragMode="move"
        scalable={true}
        cropBoxMovable={true}
        cropBoxResizable={true}
      />
      <button className="form-btn btn btn-primary upload mb-2"onClick={uploadCroppedImage}>Save Cropped Image</button>
    </div>
  );
};

export default ImageCropper;
