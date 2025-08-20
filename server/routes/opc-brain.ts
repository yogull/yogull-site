import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

// OPC Brain solution database
const solutionDbPath = path.join(process.cwd(), 'SOLUTION_DATABASE.json');
const opcBrainPath = path.join(process.cwd(), 'OPC_BRAIN_AUTO_LOADER.md');

// Load solution database
function loadSolutionDatabase() {
  try {
    if (fs.existsSync(solutionDbPath)) {
      const data = fs.readFileSync(solutionDbPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading solution database:', error);
  }
  
  // Return default structure
  return {
    categories: {
      buttons: {},
      dialogs: {},
      mobile: {},
      sharing: {},
      navigation: {},
      forms: {}
    },
    lastUpdated: new Date().toISOString()
  };
}

// Auto-load OPC Brain solutions
router.get('/auto-load', (req, res) => {
  try {
    const solutions = loadSolutionDatabase();
    
    // Load auto-loader instructions
    let autoLoader = '';
    if (fs.existsSync(opcBrainPath)) {
      autoLoader = fs.readFileSync(opcBrainPath, 'utf8');
    }

    const response = {
      success: true,
      solutions,
      autoLoaderInstructions: autoLoader,
      timestamp: new Date().toISOString(),
      message: 'OPC Brain auto-loaded all previous solutions'
    };

    console.log('🧠 OPC Brain: Auto-loaded solutions for session continuity');
    res.json(response);
  } catch (error) {
    console.error('OPC Brain auto-load error:', error);
    res.status(500).json({ 
      error: 'OPC Brain auto-load failed',
      message: 'Failed to load previous solutions'
    });
  }
});

// Check if problem has existing solution
router.get('/check/:problem', (req, res) => {
  try {
    const { problem } = req.params;
    const solutions = loadSolutionDatabase();
    
    // Search through all categories for the problem
    let foundSolution = null;
    for (const category in solutions.categories) {
      if (solutions.categories[category][problem]) {
        foundSolution = {
          category,
          solution: solutions.categories[category][problem]
        };
        break;
      }
    }

    res.json({
      success: true,
      hasSolution: !!foundSolution,
      solution: foundSolution,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('OPC Brain check error:', error);
    res.status(500).json({ error: 'Failed to check solution database' });
  }
});

// Get all solutions by category
router.get('/solutions', (req, res) => {
  try {
    const solutions = loadSolutionDatabase();
    res.json({
      success: true,
      solutions: solutions.categories,
      lastUpdated: solutions.lastUpdated,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('OPC Brain solutions error:', error);
    res.status(500).json({ error: 'Failed to retrieve solutions' });
  }
});

// Add new solution
router.post('/add-solution', (req, res) => {
  try {
    const { category, problem, solution } = req.body;
    
    if (!category || !problem || !solution) {
      return res.status(400).json({ error: 'Category, problem, and solution are required' });
    }

    const solutions = loadSolutionDatabase();
    
    if (!solutions.categories[category]) {
      solutions.categories[category] = {};
    }
    
    solutions.categories[category][problem] = {
      solution,
      timestamp: new Date().toISOString(),
      status: 'active'
    };
    
    solutions.lastUpdated = new Date().toISOString();
    
    // Save updated database
    fs.writeFileSync(solutionDbPath, JSON.stringify(solutions, null, 2));
    
    console.log(`🧠 OPC Brain: Added solution for ${category}/${problem}`);
    
    res.json({
      success: true,
      message: 'Solution added to OPC Brain database',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('OPC Brain add solution error:', error);
    res.status(500).json({ error: 'Failed to add solution' });
  }
});

// OPC Brain status
router.get('/status', (req, res) => {
  try {
    const solutions = loadSolutionDatabase();
    const totalSolutions = Object.values(solutions.categories).reduce((total: number, category: any) => {
      return total + Object.keys(category || {}).length;
    }, 0);

    res.json({
      success: true,
      status: 'active',
      totalSolutions,
      categories: Object.keys(solutions.categories).length,
      lastUpdated: solutions.lastUpdated,
      timestamp: new Date().toISOString(),
      message: 'OPC Brain fully operational'
    });
  } catch (error) {
    console.error('OPC Brain status error:', error);
    res.status(500).json({ error: 'Failed to get OPC Brain status' });
  }
});

export default router;