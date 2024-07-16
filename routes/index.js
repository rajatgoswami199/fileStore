import express from 'express';
import { processNumber, listNumbers } from '../controllers/index.js';

const router = express.Router();

router.post('/number', (req, res) => {
    try {
        const number = req.body.number;
        const result = processNumber(number);
        res.json({
            message : `Number ${number} multiplied by 7 is ${result.storedNumber} and has been stored in file ${result.outputFile}.`
        }).status(201);
    } catch (error) {
        res.status(400).json({message : error.message});
    }
});

router.get('/list', (req, res) => {
    try {
        const fileContents = listNumbers();
        res.json(fileContents).status(200);
    } catch (error) {
        res.status(500).json({message : `An error occurred while listing numbers. ${error}`});
    }
});

export default router;
