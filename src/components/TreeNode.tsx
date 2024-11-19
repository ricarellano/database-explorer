import React from 'react';
import { type TreeNode, Theme } from '../app/types'
import { ChevronRight } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { getNodeIcon } from '@/lib/getNodeIcon';

const TreeNode = React.memo(({ 
  node, 
  level,
  theme, 
  customIcons,
  isExpanded,
  onToggle
}: { 
  node: TreeNode
  level: number
  theme: Theme
  customIcons?: { [key: string]: React.ReactNode }
  isExpanded: boolean
  onToggle: (nodeName: string) => void
}) => {
  const hasChildren = node.children && node.children.length > 0
  const nodeRef = React.useRef<HTMLDivElement>(null)

  const handleClick = React.useCallback(() => {
    if (hasChildren) {
      onToggle(node.name)
    }
  }, [hasChildren, node, onToggle])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    } else if (e.key === 'ArrowRight' && hasChildren && !isExpanded) {
      e.preventDefault()
      onToggle(node.name)
    } else if (e.key === 'ArrowLeft' && hasChildren && isExpanded) {
      e.preventDefault()
      onToggle(node.name)
    }
  }, [handleClick, hasChildren, isExpanded, onToggle, node.name])

  React.useEffect(() => {
    if (nodeRef.current) {
      nodeRef.current.setAttribute('tabindex', '0')
    }
  }, [])

  return (
    <div className="select-none">
      <div
        ref={nodeRef}
        className={`flex items-center py-1.5 px-2 ${theme.hoverBackground} cursor-pointer group`}
        style={{ paddingLeft: `${level * 1.5}rem` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        {hasChildren && (
          <ChevronRight 
            className={`h-4 w-4 ${theme.chevron} transition-transform duration-200 ease-in-out mr-1
              ${isExpanded ? 'transform rotate-90' : ''}`}
            aria-hidden="true"
          />
        )}
        <span className={`${theme.icon} mr-2`} aria-hidden="true">
          {getNodeIcon(node.class, node.type, customIcons)}
        </span>
        <span className={`text-sm ${theme.text}`}>{node.name}</span>
        <div className="flex gap-1.5 ml-2">
          {node.engine && (
            <Badge 
              variant="outline"
              className={`text-[10px] px-1.5 py-0 h-4 font-normal  ${theme.badge.engine}`}
            >
              {node.engine}
            </Badge>
          )}
          {node.type && (
            <Badge 
              className={`text-[10px] px-1.5 py-0 h-4 font-normal ${theme.badge[node.type] || theme.badge.system}`}
            >
              {node.type}
            </Badge>
          )}
        </div>
      </div>
      {isExpanded && node.children && (
        <div className="ml-4">
          {node.children.map(child => (
            <TreeNode
              key={child.name}
              node={child}
              level={level + 1}
              theme={theme}
              customIcons={customIcons}
              isExpanded={isExpanded}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
})

export default TreeNode;
