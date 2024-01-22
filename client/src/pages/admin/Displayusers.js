import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Adminmenu from '../../components/Layout/Adminmenu';
import Layout from '../../components/Layout/Layout';

const Displayusers = () => {
  const [users, setUsers] = useState([]);

  const handleDelete = async (userId) => {
    try {
      // Send DELETE request to your server
      const response = await axios.delete(`${process.env.REACT_APP_API}/api/v1/auth/deleteuser/${userId}`);
  
      // Check the response and handle accordingly
      if (response.data.success === "true") {
        toast.success('User deleted successfully');
        window.location.reload()
        // You can perform additional actions after successful deletion
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
      // Handle any network or server errors
    }
  };
  const handleUpdate = async(e)=>{
    e.preventDefault()
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/getusers`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="row m-0 p-0">
        <div className="col-md-4 m-3 p-3">
          <Adminmenu />
        </div>
        <div className="col-md-6 m-3 p-2">
          <div className="card">
            <table className="table container-fluid table-bordered m-3 w-auto">
              <thead>
                <tr>
                  <th colSpan="2">
                    <h3 className="category-head">Manage Users</h3>
                  </th>
                </tr>
                <tr>
                <th scope="col" className="col-md-5">Users</th>
                <th scope="col" className="col-md-7">Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((item) => (
                  <tr key={item._id}>
                    <td className="category-title">{item.name}</td>
                    <td>
                    <button
                        className="btn btn-primary ms-3 "
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger ms-3 "
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </Layout>
  );
}

export default Displayusers