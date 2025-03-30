// Tree representation using nested parentheses notation
// Maps to OEIS A000081 sequence for rooted trees

export interface TreeNode {
  value: string;
  children: TreeNode[];
}

// Convert nested parentheses string to tree structure
export function parseParensToTree(str: string): TreeNode {
  let pos = 0;
  
  function parse(): TreeNode {
    let value = '';
    const children: TreeNode[] = [];
    
    // Read value until '(' or end
    while (pos < str.length && str[pos] !== '(' && str[pos] !== ')') {
      value += str[pos];
      pos++;
    }
    
    // Parse children if any
    if (pos < str.length && str[pos] === '(') {
      pos++; // Skip opening paren
      while (pos < str.length && str[pos] !== ')') {
        children.push(parse());
        if (pos < str.length && str[pos] === ',') pos++; // Skip comma
      }
      pos++; // Skip closing paren
    }
    
    return { value: value.trim(), children };
  }
  
  return parse();
}

// Convert tree structure to nested parentheses string
export function treeToParens(node: TreeNode): string {
  if (node.children.length === 0) {
    return node.value;
  }
  
  const childrenStr = node.children
    .map(child => treeToParens(child))
    .join(',');
    
  return `${node.value}(${childrenStr})`;
}

// Convert AgentNode to nested parentheses notation
export function agentToParens(node: AgentNode): string {
  const value = `A${node.level}`;
  if (node.children.length === 0) {
    return value;
  }
  
  const childrenStr = node.children
    .map(child => agentToParens(child))
    .join(',');
    
  return `${value}(${childrenStr})`;
}

// Generate all possible rooted trees with n nodes
export function generateTrees(n: number): string[] {
  if (n <= 0) return [];
  if (n === 1) return ['A'];
  
  const results = new Set<string>();
  
  // Generate trees recursively
  function generate(remaining: number, current: string) {
    if (remaining === 0) {
      results.add(current);
      return;
    }
    
    // Try adding node at each valid position
    for (let i = 0; i < current.length; i++) {
      if (current[i] === 'A') {
        const newTree = 
          current.slice(0, i) + 
          'A(A)' + 
          current.slice(i + 1);
        generate(remaining - 1, newTree);
      }
    }
  }
  
  generate(n - 1, 'A');
  return Array.from(results);
}

// Import types
import { AgentNode } from './agentHierarchy';