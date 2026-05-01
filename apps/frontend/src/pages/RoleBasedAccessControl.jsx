import React, { useEffect, useState } from 'react';
import RoleBasedAccessControlForm from '../components/RoleBasedAccessControlForm';
import { fetchRoles } from '../api/roleBasedAccessControlApi';

const RoleBasedAccessControl = () => {
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRoles = async () => {
            try {
                const rolesData = await fetchRoles();
                setRoles(rolesData);
            } catch (err) {
                setError('Failed to fetch roles.');
            }
        };
        getRoles();
    }, []);

    return (
        <div>
            <h1>Role-Based Access Control</h1>
            {error && <p>{error}</p>}
            <RoleBasedAccessControlForm roles={roles} />
        </div>
    );
};

export default RoleBasedAccessControl;