import { useState } from 'react'
import AgentHierarchyVisualizer from './components/AgentHierarchyVisualizer'
import { hierarchyLevels } from './config/agentHierarchy'

type HierarchyLevel = 1 | 2 | 3 | 4;

function App() {
  const [level, setLevel] = useState<HierarchyLevel>(1);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Agent Hierarchy Test Framework
        </h1>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Test agent hierarchies based on OEIS A000081 sequence mapping to rooted tree topologies.
            Each level demonstrates increasing complexity in agent cooperation patterns.
          </p>
          
          <div className="flex gap-4 mb-8">
            {(Object.keys(hierarchyLevels) as Array<keyof typeof hierarchyLevels>).map((key, idx) => {
              const levelNum = (idx + 1) as HierarchyLevel;
              const { agents, total } = hierarchyLevels[key];
              return (
                <button
                  key={key}
                  onClick={() => setLevel(levelNum)}
                  className={`
                    px-4 py-2 rounded-lg
                    ${level === levelNum ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}
                    hover:bg-blue-600 hover:text-white transition-colors
                  `}
                >
                  Level {levelNum}
                  <div className="text-sm opacity-75">
                    {agents} new ({total} total)
                  </div>
                </button>
              );
            })}
          </div>

          <AgentHierarchyVisualizer level={level} />
        </div>
      </div>
    </div>
  )
}

export default App