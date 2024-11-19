import { ReactNode } from 'react'

export interface TreeNode {
  name: string
  class: string
  type: string
  engine?: string | null
  deletable: boolean
  visible: boolean
  children?: TreeNode[]
}

export interface Theme {
  background: string
  hoverBackground: string
  text: string
  icon: string
  chevron: string
  badge: {
    [key: string]: string
  }
}

export interface TreeViewProps {
  data: TreeNode[]
  theme?: Partial<Theme>
  onNodeClick?: (node: TreeNode) => void
  customIcons?: { [key: string]: ReactNode }
  initialExpandedNodes?: string[]
}

export const theme: Theme = {
  background: 'bg-white',
  hoverBackground: 'hover:bg-gray-50',
  text: 'text-gray-900',
  icon: 'text-gray-500',
  chevron: 'text-gray-400',
  badge: {
    system: 'bg-gray-100 text-gray-800',
    project: 'bg-blue-100 text-blue-800',
    model: 'bg-purple-100 text-purple-800',
    view: 'bg-green-100 text-green-800',
    agent: 'bg-orange-100 text-orange-800',
    engine: 'bg-blue-100 text-blue-800',
  }
}
