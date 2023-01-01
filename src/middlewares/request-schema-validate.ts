import { body } from 'express-validator';

export const requestValidate = [
  body('domainName').not().isEmpty().withMessage('name should be present'),
  body('skillName')
    .isArray()
    .withMessage('should be array[]')
    .not()
    .isEmpty()
    .withMessage('skills [] should present'),
];
