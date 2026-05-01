const request = require('supertest');
const app = require('../src/index');
const db = require('../src/models');

describe('Role-Based Access Control', () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true }); // Reset database before tests
    });

    afterAll(async () => {
        await db.sequelize.close(); // Close database connection after tests
    });

    let adminToken;
    let managerToken;
    let memberToken;

    beforeEach(async () => {
        // Create users with different roles
        const adminUser = await db.User.create({ email: 'admin@example.com', password: 'password', role: 'Admin' });
        const managerUser = await db.User.create({ email: 'manager@example.com', password: 'password', role: 'Manager' });
        const memberUser = await db.User.create({ email: 'member@example.com', password: 'password', role: 'Member' });

        // Generate JWT tokens for each user
        adminToken = generateToken(adminUser);
        managerToken = generateToken(managerUser);
        memberToken = generateToken(memberUser);
    });

    function generateToken(user) {
        return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    test('Admin can access user management route', async () => {
        const response = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(response.status).toBe(200);
    });

    test('Manager cannot access user management route', async () => {
        const response = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${managerToken}`);
        expect(response.status).toBe(403);
    });

    test('Member cannot access user management route', async () => {
        const response = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${memberToken}`);
        expect(response.status).toBe(403);
    });

    test('Manager can create a project', async () => {
        const response = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${managerToken}`)
            .send({ name: 'New Project', description: 'Project Description' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Project created successfully.');
    });

    test('Member cannot create a project', async () => {
        const response = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${memberToken}`)
            .send({ name: 'New Project', description: 'Project Description' });
        expect(response.status).toBe(403);
    });
});