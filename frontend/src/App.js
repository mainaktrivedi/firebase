import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import ShowUser from './components/ShowUser';


function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleFormSubmit = () => {
    setSelectedUser(null); // Clear the form after submission
  };

  return (
    <div>
      <ShowUser selectedUser={selectedUser} onFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;


