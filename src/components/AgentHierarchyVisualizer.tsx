import React from 'react';
import { AgentNode, generateHierarchy, visualizeHierarchy } from '../config/agentHierarchy';
import { agentToParens } from '../config/treeNotation';
import TreeVisualizer from './TreeVisualizer';

interface Props {
  level: 1 | 2 | 3 | 4;
}

const AgentHierarchyVisualizer: React.FC<Props> = ({ level }) => {
  const hierarchy = generateHierarchy(level);
  const visualization = visualizeHierarchy(hierarchy);

  const renderNode = (node: AgentNode, path: string = '') => {
    const nodeKey = `${path}-${node.id}`;
    
    return (
      <div key={nodeKey} className="relative">
        <div className={`p-3 mb-2 rounded-lg flex flex-col
          ${node.level === 0 ? 'bg-blue-500 text-white' : 
            node.level === 1 ? 'bg-green-500 text-white' :
            node.level === 2 ? 'bg-yellow-500 text-white' :
            'bg-red-500 text-white'}
        `}>
          <div className="font-bold">{node.id}</div>
          {node.metrics && (
            <div className="text-xs opacity-80 mt-1">
              <div>Complexity: {node.metrics.complexity.toFixed(2)}</div>
              <div>Orthogonality: {node.metrics.orthogonality.toFixed(2)}</div>
              <div>Depth: {node.metrics.depth.toFixed(2)}</div>
              <div>Weight: {node.metrics.partitionWeight.toFixed(2)}</div>
            </div>
          )}
        </div>
        {node.children.length > 0 && (
          <div className="pl-8 border-l-2 border-gray-300">
            {node.children.map((child, index) => renderNode(child, `${nodeKey}-${index}`))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        Cognitive Topology (Level {level})
      </h2>
      <div className="text-sm text-gray-600 mb-4">
        Visualizing agent hierarchies as cognitive gradients with metrics:
        <ul className="list-disc ml-4 mt-2">
          <li><strong>Complexity:</strong> Based on OEIS A000081 sequence</li>
          <li><strong>Orthogonality:</strong> Measure of perspective independence</li>
          <li><strong>Depth:</strong> Cognitive processing capacity</li>
          <li><strong>Weight:</strong> Contribution to partition function</li>
        </ul>
      </div>
      <div className="mb-4 p-4 bg-gray-100 rounded font-mono text-sm whitespace-pre">
        {visualization}
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2">Nested Parentheses Representation</h3>
        <TreeVisualizer parenString={agentToParens(hierarchy)} />
      </div>
      <div className="mt-8">
        {renderNode(hierarchy, 'root')}
      </div>
    </div>
  );
};

export default AgentHierarchyVisualizer;