import React, { useEffect, useState } from 'react';
import ProjectAndTaskManagementForm from '../components/ProjectAndTaskManagementForm';
import { fetchProjects } from '../api/projectAndTaskManagementApi';

const ProjectAndTaskManagement = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (err) {
                setError('Failed to fetch projects.');
            } finally {
                setLoading(false);
            }
        };
        loadProjects();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Project and Task Management</h1>
            <ProjectAndTaskManagementForm />
            <ul>
                {projects.map(project => (
                    <li key={project.id}>{project.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectAndTaskManagement;