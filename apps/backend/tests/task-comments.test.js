const request = require('supertest');
const app = require('../src/index');
const db = require('../src/models');

describe('Task Comments API', () => {
  let taskId;
  let userId;

  beforeAll(async () => {
    // Setup: Create a task and a user for testing
    const user = await db.users.create({
      email: 'testuser@example.com',
      password: 'password123',
      role: 'Member'
    });
    userId = user.id;

    const task = await db.tasks.create({
      title: 'Test Task',
      status: 'To Do',
      project_id: 1,
      assigned_to: userId
    });
    taskId = task.id;
  });

  afterAll(async () => {
    // Cleanup: Remove test data
    await db.comments.destroy({ where: { task_id: taskId } });
    await db.tasks.destroy({ where: { id: taskId } });
    await db.users.destroy({ where: { id: userId } });
  });

  it('should add a comment to a task', async () => {
    const response = await request(app)
      .post(`/api/comments`)
      .send({
        task_id: taskId,
        user_id: userId,
        content: 'This is a test comment.'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Comment added successfully.');
  });

  it('should retrieve comments for a task', async () => {
    await request(app)
      .post(`/api/comments`)
      .send({
        task_id: taskId,
        user_id: userId,
        content: 'Another test comment.'
      });

    const response = await request(app)
      .get(`/api/tasks/${taskId}/comments`);

    expect(response.status).toBe(200);
    expect(response.body.comments).toBeDefined();
    expect(response.body.comments.length).toBeGreaterThan(0);
  });
});