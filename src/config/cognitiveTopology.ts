// Cognitive Topology Configuration
// Maps differential relationships in agent hierarchies

export interface CognitiveGradient {
  level: number;
  complexity: number; // Based on OEIS A000081
  orthogonality: number; // Measure of perspective independence
  depth: number; // Cognitive processing depth
}

export interface TopologyNode {
  gradient: CognitiveGradient;
  children: TopologyNode[];
  partitionWeight: number; // Weight in partition function
}

// OEIS A000081 sequence values for rooted tree topologies
// Represents number of distinct agent role patterns at each level
export const complexitySequence = [1, 2, 4, 9, 20, 48, 115];
export const cumulativeComplexity = [1, 3, 7, 16, 36, 84, 199];

// Calculate orthogonality score based on level and siblings
export function calculateOrthogonality(level: number, siblings: number): number {
  // Higher levels have more orthogonal perspectives due to specialization
  const levelFactor = Math.log(level + 1) / Math.log(4); // Normalized to [0,1] for levels 0-3
  
  // More siblings = more diverse perspectives in the cognitive landscape
  const siblingFactor = Math.log(siblings + 1) / Math.log(10); // Normalized for up to 9 siblings
  
  // Combine factors with diminishing returns
  return Math.min(levelFactor * siblingFactor, 1);
}

// Calculate cognitive depth based on level and complexity
export function calculateDepth(level: number, complexity: number): number {
  // Depth increases with level but has diminishing returns
  const levelDepth = 1 - Math.exp(-level);
  
  // Complexity contributes logarithmically to depth
  const complexityDepth = Math.log(complexity + 1) / Math.log(complexitySequence[level] + 1);
  
  // Average of level and complexity contributions
  return (levelDepth + complexityDepth) / 2;
}

// Calculate partition weight for cognitive landscape
export function calculatePartitionWeight(node: TopologyNode): number {
  const { gradient } = node;
  
  // Base weight determined by complexity and orthogonality
  const baseWeight = gradient.complexity * gradient.orthogonality;
  
  // Adjust for cognitive depth with diminishing returns
  const depthFactor = 1 - Math.exp(-gradient.depth);
  
  return baseWeight * depthFactor;
}