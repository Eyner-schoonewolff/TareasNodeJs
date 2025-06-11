const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateRequest = require('../middleware/validateRequest');

// Validaciones
const taskValidations = [
  body('title').trim().notEmpty().withMessage('El título es requerido'),
  body('description').optional().trim(),
  body('completed').optional().isBoolean().withMessage('Completed debe ser un valor booleano')
];

// Rutas
router.get('/', taskController.getTasks);
router.post('/', taskValidations, validateRequest, taskController.createTask);
router.put('/:id', taskValidations, validateRequest, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router; 