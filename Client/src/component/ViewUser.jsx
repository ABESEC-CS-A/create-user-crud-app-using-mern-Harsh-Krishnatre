import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

const ViewUser = () => {
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({
        id: '',
        name: '',
        email: '',
        role: ''
    });
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            setLoading(true);
            const apiUrl = "http://localhost:4001";
            const res = await axios.get(`${apiUrl}/users`);
            console.log("API Response:", res.data);
            
            if (Array.isArray(res.data)) {
                setUsers(res.data);
            } else if (res.data && Array.isArray(res.data.users)) {
                setUsers(res.data.users);
            } else if (res.data && typeof res.data === 'object') {
                const possibleArrays = Object.values(res.data).filter(Array.isArray);
                if (possibleArrays.length > 0) {
                    setUsers(possibleArrays[0]);
                } else {
                    console.error("Couldn't find an array in API response:", res.data);
                    setUsers([]);
                    setError("Invalid data format from API");
                }
            } else {
                console.error("Unexpected API response format:", res.data);
                setUsers([]);
                setError("Invalid data format from API");
            }
        } catch (err) {
            console.error("API Error:", err);
            setError(err.message);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    const handleInsert = async () => {
        try {
            if(!newUser.name || !newUser.email || !newUser.role) {
                alert("Please fill all the fields");
                return;
            }
            const {id, ...userData} = newUser;
            
            const apiUrl = "http://localhost:4001";
            await axios.post(`${apiUrl}/users`, userData);

            setNewUser({ id: '', name: '', email: '', role: '' });
            setError(null);
            loadUser();
        } catch(err) {
            setError(err.message);
        }
    };

    const handleEdit = (user) => {
        setEdit(true);
        setEditId(user._id);
        setNewUser({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    };

    const handleUpdate = async () => {
        try {
            if (!newUser.name || !newUser.email || !newUser.role) {
                setError("Please fill all required fields");
                return;
            }
            
            const { id, ...userData } = newUser;
            
            const apiUrl = "http://localhost:4001";
            await axios.put(`${apiUrl}/users/${editId}`, userData);
            
            setNewUser({ id: '', name: '', email: '', role: '' });
            setEdit(false);
            setEditId(null);
            setError(null);
            loadUser();
        } catch (err) {
            setError(`Failed to update user: ${err.message}`);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const apiUrl = "http://localhost:4001";
                await axios.delete(`${apiUrl}/users/${userId}`);
                loadUser();
            } catch (err) {
                setError(`Failed to delete user: ${err.message}`);
            }
        }
    };

    const handleCancel = () => {
        setEdit(false);
        setEditId(null);
        setNewUser({ id: '', name: '', email: '', role: '' });
    };

    return (
        <div className='content'>
            <h1>View Users</h1>
            {loading ? (
                <div className="loading-message">Loading users...</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" name="id" id="uid" value={newUser.id} onChange={handleInputChange} disabled={true}/>
                            </td>
                            <td>
                                <input type="text" name="name" id="uname" value={newUser.name} onChange={handleInputChange} />
                            </td>
                            <td>
                                <input type="email" name="email" id="uemail" value={newUser.email} onChange={handleInputChange}/>
                            </td>
                            <td>
                                <input type="text" name="role" id="urole" value={newUser.role} onChange={handleInputChange}/>
                            </td>
                            <td>
                            {edit ? (
                                <>
                                    <button type="button" className='add' onClick={handleUpdate}>Update</button>
                                    <button type="button" className='cancel' onClick={handleCancel}>Cancel</button>
                                </>
                            ) : (
                                <button type="button" className='add' onClick={handleInsert}>Insert</button>
                            )}
                            </td>
                        </tr>
                        {error ? (
                            <tr>
                                <td colSpan="5" className="error-message">Error: {error}</td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="empty-message">No users found</td>
                            </tr>
                        ) : (
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewUser;