import React, { useEffect, useState } from 'react';
import TaskCommentsForm from '../components/TaskCommentsForm';
import { fetchComments } from '../api/taskCommentsApi';

const TaskComments = ({ taskId }) => {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getComments = async () => {
            try {
                const data = await fetchComments(taskId);
                setComments(data);
            } catch (err) {
                setError('Failed to fetch comments.');
            }
        };
        getComments();
    }, [taskId]);

    return (
        <div>
            <h2>Comments</h2>
            {error && <p>{error}</p>}
            <TaskCommentsForm taskId={taskId} setComments={setComments} />
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskComments;