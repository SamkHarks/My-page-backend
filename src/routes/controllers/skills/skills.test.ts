import app from '@/app.js';
import supertest from 'supertest';

const api = supertest(app);

describe('GET /api/skills', () => {
  it('should return a list of skills', async () => {
    await api
      .get('/api/skills')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('skills');
        expect(Array.isArray(res.body.skills)).toBe(true);
        expect(res.body.skills.length).toBe(3);
      });
  });
});
