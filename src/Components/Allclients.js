import React, { useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { env } from '../api';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';

function Allclients() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const apiurl = process.env.REACT_APP_API_URL;

  const loadData = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const res = await axios.get(`${apiurl}/users/allusers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.statusCode === 200) {
          setUsers(res.data.users);
          toast.success('Users Data Fetched Successfully', {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        } else {
          console.log(res.data.message);
          setTimeout(() => {
            logout();
          }, 3000);
        }
      } else {
        console.log('No Token Found');
        setTimeout(() => {
          logout();
        }, 3000);
      }
    } catch (error) {
      toast.error('Failed to fetch users', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  const changeUserRole = async (id, newRole) => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const res = await axios.put(`${apiurl}/users/update-role/${id}`, { newRole }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.statusCode === 200) {
          console.log(res.data.message);
          const updatedUsers = users.map(user =>
            user._id === id ? { ...user, role: newRole } : user
          );
          setUsers(updatedUsers);
        } else {
          console.log(res.data.message);
        }
      } else {
        console.log('No Token Found');
        setTimeout(() => {
          logout();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update user role');
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const res = await axios.delete(`${env.apiurl}/users/delete-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.statusCode === 200) {
          console.log(res.data.message);
          setUsers(users.filter((user) => user._id !== id));
        } else {
          console.log(res.data.message);
        }
      } else {
        console.log('No Token Found');
        setTimeout(() => {
          logout();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete user');
    }
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.No</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
            <Button
                className='m-1'
                variant='secondary'
                onClick={() => changeUserRole(user._id, user.role === 'user' ? 'admin' : 'user')}
              >
                Change Role
              </Button>
              <Button
                className='m-1'
                variant='danger'
                onClick={() => {
                  const confirmDelete = window.confirm(`Are you sure you want to delete ${user.firstName} (${user.email})?`);
                  if (confirmDelete) {
                    deleteUser(user._id);
                  }
                }}
              >
              Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <ToastContainer/>
    </>
  )
}

export default Allclients