import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

// AI Memory API - Brain mapping system for session continuity
router.get('/api/ai-memory/solutions', (req, res) => {
  try {
    const solutionPath = path.join(__dirname, '../../SOLUTION_DATABASE.json');
    const memoryPath = path.join(__dirname, '../../AI_MEMORY_SYSTEM.md');
    
    if (fs.existsSync(solutionPath)) {
      const solutions = JSON.parse(fs.readFileSync(solutionPath, 'utf8'));
      const memoryDoc = fs.existsSync(memoryPath) ? fs.readFileSync(memoryPath, 'utf8') : '';
      
      res.json({
        solutions,
        memoryDocument: memoryDoc,
        lastUpdated: new Date().toISOString(),
        message: "AI Memory System - Preventing repeated fixes"
      });
    } else {
      res.status(404).json({ error: 'Solution database not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to load AI memory system' });
  }
});

// Add new solution to memory
router.post('/api/ai-memory/add-solution', (req, res) => {
  try {
    const { category, problem, solution, status } = req.body;
    const solutionPath = path.join(__dirname, '../../SOLUTION_DATABASE.json');
    
    let solutions = {};
    if (fs.existsSync(solutionPath)) {
      solutions = JSON.parse(fs.readFileSync(solutionPath, 'utf8'));
    }
    
    solutions[category] = {
      problem,
      solution,
      status,
      date_added: new Date().toISOString(),
      session_id: `session_${Date.now()}`
    };
    
    fs.writeFileSync(solutionPath, JSON.stringify(solutions, null, 2));
    
    res.json({ 
      message: 'Solution added to AI memory',
      category,
      total_solutions: Object.keys(solutions).length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add solution to memory' });
  }
});

// Quick check for specific problem
router.get('/api/ai-memory/check/:problem', (req, res) => {
  try {
    const problemKey = req.params.problem;
    const solutionPath = path.join(__dirname, '../../SOLUTION_DATABASE.json');
    
    if (fs.existsSync(solutionPath)) {
      const solutions = JSON.parse(fs.readFileSync(solutionPath, 'utf8'));
      
      if (solutions[problemKey]) {
        res.json({
          found: true,
          solution: solutions[problemKey],
          message: `Solution exists - do not rebuild`
        });
      } else {
        res.json({
          found: false,
          message: `No existing solution for ${problemKey}`,
          available_solutions: Object.keys(solutions)
        });
      }
    } else {
      res.status(404).json({ error: 'Solution database not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to check AI memory' });
  }
});

export default router;