import { body } from 'express-validator';
import { ValidationChain } from 'express-validator/src/chain';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The task title is mandatory')
    .trim()
    .isString()
    .withMessage('Title must be in text format'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('The task date is mandatory')
    .isString()
    .withMessage('Date must be in valid date format'),
  body('description')
    .trim()
    .isString()
    .withMessage('Description must be in text format'),
  body('priority')
    .trim()
    .isIn([Priority.normal, Priority.high, Priority.low])
    .withMessage('Priority must be normal, high,or low'),
  body('status')
    .trim()
    .isIn([Status.completed, Status.inProgress, Status.todo])
    .withMessage('Status must be completed, inProgress,or todo'),
];

export const updateValidator: ValidationChain[] = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The task ID is mandatory')
    .trim()
    .isString()
    .withMessage('ID must be in text format'),
  body('status')
    .trim()
    .isIn([Status.completed, Status.inProgress, Status.todo])
    .withMessage('Status must be completed, inProgress,or todo'),
];
