import React from 'react';
import { TreeNode, parseParensToTree } from '../config/treeNotation';

interface Props {
  parenString: string;
}

const TreeVisualizer: React.FC<Props> = ({ parenString }) => {
  const tree = parseParensToTree(parenString);
  
  const renderNode = (node: TreeNode, path: string = '') => {
    // Create unique key using full path to node
    const nodeKey = `${path}-${node.value}`;
    
    return (
      <div key={nodeKey} className="relative">
        <div className="p-2 mb-2 rounded bg-blue-100 inline-block">
          {node.value}
        </div>
        {node.children.length > 0 && (
          <div className="pl-8 border-l-2 border-gray-200">
            {node.children.map((child, index) => renderNode(child, `${nodeKey}-${index}`))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="font-mono mb-4">
        {parenString}
      </div>
      {renderNode(tree, 'root')}
    </div>
  );
};

export default TreeVisualizer;