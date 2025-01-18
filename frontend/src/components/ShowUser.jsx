import React, { useEffect, useState } from 'react';
import { getUser, createUser,updateUser, deleteUser } from '../apis/UserApi';

const ShowUser = ({ onEdit }) => {
  const [user, setUser] = useState([]);
  const [mode,setMode] = useState(null);
  let emptyUser = {
    id: '',
    name: '',
    zipCode: '',
    lat: '',
    lon: '',
    timezone: ''
  }
  const [formData, setFormData] = useState(emptyUser);

  useEffect(() => {
  }, []);

  const fetchUser = async () => {
    try {
      console.log('fetch user called'); 
      const response = await getUser(formData.id);
      let user = response.data.data;
      console.log('User:',user);
      if (user === undefined) {
        alert('No user found with the given ID');
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        name: user.name,
        zipCode: user.zipCode,
        lat: user.lat,
        lon: user.lon,
        timezone: user.timezone
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreate = async () => {
    try {
      let resp = await createUser(formData);
      console.log('Create User:',resp);
      fetchUser();
    } catch (error) {
      if (error.response) {
        alert('Error creating user: \n' + error.response.data.error_message);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUser(formData.id, formData);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const handleClear = async () => {
    try {
      setFormData(emptyUser)
      
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteUser(formData.id);
      setFormData(emptyUser)
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target; // Get name and value of the input field
    setFormData((prevData) => ({
      ...prevData, 
      [name]: value, // Update the corresponding field
    }));
    console.log('Form Data:', JSON.stringify(formData)); // Log the updated form data
  };


  return (
    <div>
      <h2>User Detail</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> 
              <input name="id" type="text" placeholder="Search by Id" 
                value={formData.id} 
                onChange={handleInputChange} // Update state on input change 
                />
            </td>
            <td>
            <button onClick={fetchUser}>Search</button>
            </td>
          </tr>
          <tr>
            <td> 
              <input name="name" type="text" placeholder="" 
                value={formData.name} 
                onChange={handleInputChange} // Update state on input change 
                />
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td> 
              <input name="zipCode" type="text" placeholder="" 
                value={formData.zipCode} 
                onChange={handleInputChange} // Update state on input change 
                />
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td> 
              <input name="lon" type="text" placeholder="" readOnly={true}
                value={formData.lon} 
                />
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td> 
              <input name="lat" type="text" placeholder="" readOnly={true}
                value={formData.lat} 
                />
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td> 
              <input name="timezone" type="text" placeholder="" readOnly={true}
                value={formData.timezone} 
                />
            </td>
            <td>
            </td>
          </tr>
          <tr>
          </tr>
          <tr>
            <td>
              <button onClick={handleCreate}  >Create</button>
              <button onClick={handleUpdate}  >Update</button>
              <button onClick={handleDelete} >Delete</button>
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={handleClear} >Clear</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowUser;
