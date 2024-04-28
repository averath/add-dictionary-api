import Dictionary from 'App/controllers/Dictionary';
import { Router } from 'express';

const dictionariesRoutes = Router();

dictionariesRoutes.post(
    ['/api/add-dictionary'],
    async (req, res, next) => await Dictionary.add(req, res, next)
);

export default dictionariesRoutes;
