"use client"

import React from 'react';
import { TreeViewProps, theme } from '../app/types';
import TreeNode from './TreeNode';

export default function DatabaseExplorer({
  data,
  customIcons,
  initialExpandedNodes = []
}: TreeViewProps) {
  const [expandedNodes, setExpandedNodes] = React.useState<Set<string>>(new Set(initialExpandedNodes));
  const [focusedNodeName, setFocusedNodeName] = React.useState<string | null>(null);

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

  const flattenedNodes = React.useMemo(() => {
    const flatten = (nodes: TreeNode[], level = 0): TreeNode[] => {
      return nodes.flatMap(node => {
        const flatNode = { ...node, level }
        return [
          flatNode,
          ...(expandedNodes.has(node.name) && node.children
            ? flatten(node.children, level + 1)
            : [])
        ]
      })
    }
    return flatten(data)
  }, [data, expandedNodes])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent, node: TreeNode) => {
    const currentIndex = flattenedNodes.findIndex(n => n.name === node.name)
    if (e.key === 'ArrowDown') {
      const nextIndex = Math.min(currentIndex + 1, flattenedNodes.length - 1)
      setFocusedNodeName(flattenedNodes[nextIndex].name)
    } else if (e.key === 'ArrowUp') {
      const prevIndex = Math.max(currentIndex - 1, 0)
      setFocusedNodeName(flattenedNodes[prevIndex].name)
    }
  }, [flattenedNodes])

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
        onKeyDown={handleKeyDown}
        isFocused={focusedNodeName === node.name}
      />
    ))
  }, [theme, customIcons, expandedNodes, toggleNode, handleKeyDown, focusedNodeName])

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
