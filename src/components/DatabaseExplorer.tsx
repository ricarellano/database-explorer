"use client"

import React from 'react';
import { TreeViewProps, defaultTheme } from '../app/types';
import TreeNode from './TreeNode';

export default function DatabaseExplorer({
  data,
  theme: customTheme,
  customIcons,
  initialExpandedNodes = []
}: TreeViewProps) {
  const theme = React.useMemo(() => ({ ...defaultTheme, ...customTheme }), [customTheme])
  const [expandedNodes, setExpandedNodes] = React.useState<Set<string>>(new Set(initialExpandedNodes))

  const toggleNode = React.useCallback((nodeName: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(nodeName)) {
        newSet.delete(nodeName)
      } else {
        newSet.add(nodeName)
      }
      return newSet
    })
  }, [])

  const renderTree = React.useCallback((nodes: TreeNode[], level: number) => {
    return nodes.map(node => (
      <TreeNode
        key={node.name}
        node={node}
        level={level}
        theme={theme}
        customIcons={customIcons}
        isExpanded={expandedNodes.has(node.name)}
        onToggle={toggleNode}
      />
    ))
  }, [theme, customIcons, expandedNodes, toggleNode])

  return (
    <div 
      className={`w-full max-w-md border border-gray-200 rounded-lg ${theme.background}`}
      role="tree"
      aria-label="Database Explorer"
    >
      <div className="p-4 border-b border-gray-200">
        <h2 className={`text-lg font-semibold ${theme.text}`}>Database Explorer</h2>
      </div>
      <div className="p-2 overflow-auto">
        {renderTree(data, 0)}
      </div>
    </div>
  )
}
