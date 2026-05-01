import React, { useEffect, useState } from 'react';
import AdminUserManagementForm from '../components/AdminUserManagementForm';
import { fetchUsers, deleteUser } from '../api/adminUserManagementApi';

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersList = await fetchUsers();
                setUsers(usersList);
            } catch (err) {
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
        } catch (err) {
            setError('Failed to delete user.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Admin User Management</h1>
            <AdminUserManagementForm setUsers={setUsers} />
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.email} - {user.role} 
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminUserManagement;