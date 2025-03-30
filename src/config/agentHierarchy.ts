// Agent Hierarchy Configuration based on OEIS A000081
// Maps to rooted tree topologies and elementary differentials

import { complexitySequence, calculateOrthogonality, calculateDepth } from './cognitiveTopology';
import { agentToParens } from './treeNotation';

export interface AgentNode {
  id: string;
  level: number; 
  parentId?: string;
  children: AgentNode[];
  metrics?: {
    complexity: number;
    orthogonality: number;
    depth: number;
    partitionWeight: number;
  };
}

// Define hierarchy levels based on OEIS A000081 sequence
export const hierarchyLevels = {
  level1: { agents: 1, total: 1 },    // Root agent
  level2: { agents: 2, total: 3 },    // Root + 2 children
  level3: { agents: 4, total: 7 },    // Previous + 4 grandchildren
  level4: { agents: 9, total: 16 }    // Previous + 9 great-grandchildren
};

// Generate agent hierarchy tree
export function generateHierarchy(level: 1 | 2 | 3 | 4): AgentNode {
  const calculateMetrics = (node: AgentNode, siblings: number) => {
    const complexity = complexitySequence[node.level];
    const orthogonality = calculateOrthogonality(node.level, siblings);
    const depth = calculateDepth(node.level, complexity);
    const partitionWeight = complexity * orthogonality * (1 - Math.exp(-depth));
    
    return {
      complexity,
      orthogonality,
      depth,
      partitionWeight
    };
  };

  const root: AgentNode = {
    id: 'agent-0',
    level: 0,
    children: [],
    metrics: calculateMetrics({ id: 'agent-0', level: 0, children: [] }, 0)
  };

  if (level >= 2) {
    // Add 2 children to root
    for (let i = 0; i < 2; i++) {
      const child: AgentNode = {
        id: `agent-1-${i}`,
        level: 1,
        parentId: root.id,
        children: [],
        metrics: calculateMetrics({ id: `agent-1-${i}`, level: 1, children: [] }, 2)
      };
      root.children.push(child);
    }
  }

  if (level >= 3) {
    // Add 4 grandchildren distributed among children
    root.children.forEach((child, idx) => {
      for (let i = 0; i < 2; i++) {
        const grandchild: AgentNode = {
          id: `agent-2-${idx}-${i}`,
          level: 2,
          parentId: child.id,
          children: [],
          metrics: calculateMetrics({ id: `agent-2-${idx}-${i}`, level: 2, children: [] }, 2)
        };
        child.children.push(grandchild);
      }
    });
  }

  if (level >= 4) {
    // Add 9 great-grandchildren distributed among grandchildren
    root.children.forEach((child) => {
      child.children.forEach((grandchild, idx) => {
        // Distribute 9 agents unevenly (3 + 2 pattern) to demonstrate specialization
        for (let i = 0; i < (idx === 0 ? 3 : 2); i++) {
          const greatGrandchild: AgentNode = {
            id: `agent-3-${grandchild.id}-${i}`,
            level: 3,
            parentId: grandchild.id,
            children: [],
            metrics: calculateMetrics({ id: `agent-3-${grandchild.id}-${i}`, level: 3, children: [] }, idx === 0 ? 3 : 2)
          };
          grandchild.children.push(greatGrandchild);
        }
      });
    });
  }

  return root;
}

// Utility function to count total agents in hierarchy
export function countAgents(root: AgentNode): number {
  let count = 1; // Count current node
  for (const child of root.children) {
    count += countAgents(child);
  }
  return count;
}

// Utility function to visualize hierarchy
export function visualizeHierarchy(root: AgentNode, indent = ''): string {
  const parens = agentToParens(root);
  let result = `${indent}${root.id} -> ${parens}\n`;
  for (const child of root.children) {
    result += visualizeHierarchy(child, indent + '  ');
  }
  return result;
}