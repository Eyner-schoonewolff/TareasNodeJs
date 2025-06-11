const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Task = require('../models/Task');

beforeAll(async () => {
  const testDB = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/metnet_test';
  await mongoose.connect(testDB);
});

beforeEach(async () => {
  await Task.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Task API', () => {
  describe('GET /tasks', () => {
    it('debería obtener todas las tareas', async () => {
      await Task.create([
        { title: 'Tarea 1', description: 'Descripción 1' },
        { title: 'Tarea 2', description: 'Descripción 2' }
      ]);

      const response = await request(app).get('/tasks');
      
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });

  describe('POST /tasks', () => {
    it('debería crear una nueva tarea', async () => {
      const taskData = {
        title: 'Nueva Tarea',
        description: 'Descripción de la tarea'
      };

      const response = await request(app)
        .post('/tasks')
        .send(taskData);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(taskData.title);
      expect(response.body.description).toBe(taskData.description);
    });

    it('debería fallar si falta el título', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({ description: 'Sin título' });

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /tasks/:id', () => {
    it('debería actualizar una tarea existente', async () => {
      const task = await Task.create({
        title: 'Tarea Original',
        description: 'Descripción original'
      });

      const response = await request(app)
        .put(`/tasks/${task._id}`)
        .send({
          title: 'Tarea Actualizada',
          description: 'Descripción actualizada'
        });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Tarea Actualizada');
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('debería eliminar una tarea existente', async () => {
      const task = await Task.create({
        title: 'Tarea a eliminar',
        description: 'Esta tarea será eliminada'
      });

      const response = await request(app)
        .delete(`/tasks/${task._id}`);

      expect(response.status).toBe(200);
      
      const deletedTask = await Task.findById(task._id);
      expect(deletedTask).toBeNull();
    });
  });
}); 