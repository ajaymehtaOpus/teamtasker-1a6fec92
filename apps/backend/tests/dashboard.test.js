const request = require('supertest');
const app = require('../src/index');

describe('Dashboard Tests', () => {
  let token;

  beforeAll(async () => {
    // Simulate user login to get JWT token
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'password' });
    token = response.body.token;
  });

  test('GET /api/dashboard - should return total tasks by status', async () => {
    const response = await request(app)
      .get('/api/dashboard')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('totalTasks');
    expect(response.body.totalTasks).toHaveProperty('To Do');
    expect(response.body.totalTasks).toHaveProperty('In Progress');
    expect(response.body.totalTasks).toHaveProperty('Done');
  });
});