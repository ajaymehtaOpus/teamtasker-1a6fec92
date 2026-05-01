import React, { useEffect, useState } from 'react';
import DashboardForm from '../components/DashboardForm';
import { fetchDashboardData } from '../api/dashboardApi';

const Dashboard = () => {
    const [taskCounts, setTaskCounts] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchDashboardData();
                setTaskCounts(data);
            } catch (err) {
                setError('Failed to fetch dashboard data.');
            }
        };
        getData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <DashboardForm taskCounts={taskCounts} />
        </div>
    );
};

export default Dashboard;