const request = require('supertest');
const app = require('../src/index');
const db = require('../src/models');

describe('Admin User Management', () => {
  let adminToken;

  beforeAll(async () => {
    // Assuming we have a function to log in as admin and get a token
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'adminpassword' });
    adminToken = response.body.token;
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  it('should retrieve a list of users', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.users).toBeDefined();
  });

  it('should create a new user', async () => {
    const newUser = { email: 'newuser@example.com', password: 'password123', role: 'Member' };
    const response = await request(app)
      .post('/api/auth/register')
      .send(newUser);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User registered successfully.');
  });

  it('should update an existing user', async () => {
    const userToUpdate = await db.users.findOne({ where: { email: 'newuser@example.com' } });
    const updatedUser = { role: 'Admin' };
    const response = await request(app)
      .put(`/api/users/${userToUpdate.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User updated successfully.');
  });

  it('should delete a user', async () => {
    const userToDelete = await db.users.findOne({ where: { email: 'newuser@example.com' } });
    const response = await request(app)
      .delete(`/api/users/${userToDelete.id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully.');
  });
});