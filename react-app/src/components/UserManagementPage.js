import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const UserManagementPage = () => {
  //const users = useSelector(state => state.users);

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Not Authorized');
      return;
    }
    axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch users');
        console.error(error);
      });
  }, []);

  const dispatch = useDispatch();

  const [editUser, setEditUser] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleEdit = (user) => {
    // setEditUser(user);
    // setFirstname(user.firstname);
    // setLastname(user.lastname);
  };

  const handleUpdate = () => {
    // dispatch({
    //   type: 'UPDATE_USER',
    //   payload: { ...editUser, firstname, lastname },
    // });
    // setEditUser(null);
    // setFirstname('');
    // setLastname('');
  };

  const handleDelete = (id) => {
    //dispatch({ type: 'DELETE_USER', payload: id });
  };

  if (error) {
    return (
      <div style={styles.container}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>User Management</h2>
      {editUser ? (
        <div style={styles.form}>
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleUpdate} style={styles.button}>
            Update
          </button>
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.username}</td>
                <td>
                  <button onClick={() => handleEdit(user)} style={styles.editButton}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)} style={styles.deleteButton}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    margin: '10px',
    padding: '10px',
    width: '200px',
  },
  button: {
    padding: '10px 20px',
    background: '#28a745',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
  },
  table: {
    margin: '20px auto',
    borderCollapse: 'collapse',
    width: '80%',
  },
  editButton: {
    background: '#ffc107',
    color: '#000',
    padding: '5px 10px',
    marginRight: '5px',
    border: 'none',
    borderRadius: '5px',
  },
  deleteButton: {
    background: '#dc3545',
    color: '#FFF',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
  },
};

export default UserManagementPage;