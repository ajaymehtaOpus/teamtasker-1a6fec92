const request = require('supertest');
const app = require('../src/index');
const db = require('../src/models');

describe('Project and Task Management', () => {
  let token;

  beforeAll(async () => {
    // Mock login to get JWT token
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'manager@example.com', password: 'password' });
    token = response.body.token;
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe('POST /api/projects', () => {
    it('should create a new project', async () => {
      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'New Project', description: 'Project Description' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Project created successfully.');
    });
  });

  describe('POST /api/tasks', () => {
    it('should assign a task to a user', async () => {
      const projectResponse = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Another Project', description: 'Another Description' });

      const projectId = projectResponse.body.project.id;

      const response = await request(app)
        .post(`/api/tasks`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'New Task', status: 'To Do', project_id: projectId, assigned_to: 1 });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Task assigned successfully.');
    });
  });
});