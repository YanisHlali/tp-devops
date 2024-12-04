const request = require('supertest');
const app = require('../server'); // Importez l'application

describe('Tasks API', () => {
  test('GET /api/tasks - should return all tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      { id: 1, title: 'Learn Node.js', completed: false },
      { id: 2, title: 'Build an app', completed: false },
    ]);
  });

  test('GET /api/tasks/:id - should return a specific task', async () => {
    const response = await request(app).get('/api/tasks/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: 1, title: 'Learn Node.js', completed: false });
  });

  test('GET /api/tasks/:id - should return 404 if task not found', async () => {
    const response = await request(app).get('/api/tasks/999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'Task not found' });
  });

  test('POST /api/tasks - should create a new task', async () => {
    const newTask = { title: 'Write tests' };
    const response = await request(app).post('/api/tasks').send(newTask);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: 3,
      title: 'Write tests',
      completed: false,
    });
  });

  test('PUT /api/tasks/:id - should update a task', async () => {
    const updatedTask = { title: 'Learn Jest', completed: true };
    const response = await request(app).put('/api/tasks/1').send(updatedTask);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      title: 'Learn Jest',
      completed: true,
    });
  });

  test('DELETE /api/tasks/:id - should delete a task', async () => {
    const response = await request(app).delete('/api/tasks/1');
    expect(response.statusCode).toBe(204);
  });

  test('DELETE /api/tasks/:id - should return 404 if task not found', async () => {
    const response = await request(app).delete('/api/tasks/999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'Task not found' });
  });
});
