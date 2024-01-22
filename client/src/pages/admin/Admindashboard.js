import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/Adminmenu";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import ImageCropper from "./ImageCropper";
const Admindashboard = () => {
  const [showCropper, setShowCropper] = useState(false);
  const handleShowCropper = () => {
    setShowCropper(true);
  };

  const handleHideCropper = () => {
    setShowCropper(false);
  };
  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const id = auth?.user?.id;

      const productData = new FormData();
      productData.append("photo", photo);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/saveuserphoto/${id}`,
        productData,
        {
          headers: {
            authorization: auth?.token,
          },
        }
      );
      if (data.success === "true") {
        toast.success("photo updated successfully");
        window.location.reload();
      } else if (data.success === "false") {
        toast.error(data.messege);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [auth] = useAuth();
  const [photo, setphoto] = useState();
  console.log(auth);
  return (
    <Layout>
    <div className="row m-0 p-0">
      <div className="col-lg-4 col-md-4 m-3 p-3">
        <Adminmenu />
      </div>
      <div className="col-lg-6 col-md-7 m-3 p-2">
        <div className="card">
          <div className="container p-3">
              <div
                className="user-profile-image card"
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "auto",
                  border: "0.5px solid",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/auth/getuserphoto/${auth?.user?.id}`} // Update with actual image source or default image URL
                  alt="User Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* Conditionally render the "Edit Profile Photo" button based on showCropper state */}
              {!showCropper && (
                <button
                  className="form-btn btn btn-primary mb-2"
                  onClick={handleShowCropper}
                >
                  Edit Profile Photo
                </button>
              )}

              {/* Conditionally render the ImageCropper based on the state */}
              {showCropper && (
                <div className="d-flex align-items-center justify-content-center">
                  <ImageCropper
                    imageSrc={`${process.env.REACT_APP_API}/api/v1/auth/getuserphoto/${auth?.user?.id}`}
                  />
                </div>
              )}
              <div className="mb-2 d-flex align-items-center justify-content-center upload">
                <form onSubmit={handelSubmit}>
                  <label className="btn btn-outline-secondary upload-photo-btn">
                    <span className="photo-name">
                      {photo ? photo.name : "upload photo"}
                    </span>
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      required
                      onChange={(e) => setphoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                  {photo && (
                    <button type="submit" className="form-btn btn btn-primary">
                      Save
                    </button>
                  )}
                </form>
              </div>
              <div className="table-responsive m-2 mb-0">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th colSpan="2">
                      <h3 className="category-head m-0">User Information</h3>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="col" className="col-md-5">
                      User Name
                    </th>
                    <td>{auth?.user?.name}</td>
                  </tr>
                  <tr>
                    <th scope="col" className="col-md-5">
                      Email
                    </th>
                    <td>{auth?.user?.email}</td>
                  </tr>
                  <tr>
                    <th scope="col" className="col-md-5">
                      Contact
                    </th>
                    <td>{auth?.user?.contact}</td>
                  </tr>
                  <tr>
                    <th scope="col" className="col-md-5">
                      Address
                    </th>
                    <td>{auth?.user?.address}</td>
                  </tr>
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default Admindashboard;
