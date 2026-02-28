import express from 'express';
const router = express.Router();
import Assignment from '../models/Assignment.js';
import { executeQuery } from '../utils/queryEngine.js';
import { getHint } from '../utils/llmHint.js';

// Get all assignments
router.get('/assignments', async (req, res) => {
    try {
        const assignments = await Assignment.find({}, 'title description difficulty');
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get single assignment
router.get('/assignments/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        res.json(assignment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Execute SQL
router.post('/execute', async (req, res) => {
    const { sql } = req.body;
    try {
        const result = await executeQuery(sql);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Hint
router.post('/hint', async (req, res) => {
    const { assignmentId, userQuery } = req.body;
    try {
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

        const hint = await getHint(assignment, userQuery);
        res.json({ hint });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
