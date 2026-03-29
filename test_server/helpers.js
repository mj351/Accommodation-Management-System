const request = require('supertest');

let userCounter = 0;

/**
 * Register a user with the given role and return the JWT token.
 */
async function getAuthToken(app, role = 'staff') {
  userCounter += 1;
  const res = await request(app)
    .post('/api/users/register')
    .send({
      username: `testuser_${role}_${userCounter}_${Date.now()}`,
      password: 'password123',
      role,
    });

  return res.body.token;
}

async function getAdminToken(app) {
  return getAuthToken(app, 'admin');
}

async function getStaffToken(app) {
  return getAuthToken(app, 'staff');
}

module.exports = { getAuthToken, getAdminToken, getStaffToken };
