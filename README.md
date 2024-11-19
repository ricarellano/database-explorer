# Database Explorer Component

The Database Explorer is a highly customizable, accessible, and performant React component designed for visualizing and interacting with hierarchical database structures. Built with TypeScript and styled using Tailwind CSS, it's perfect for Next.js applications but can be easily adapted for other React-based projects.

## Features

- **Type-safe**: Fully typed with TypeScript for improved developer experience and code reliability.
- **Recursive Rendering**: Efficiently handles nested data structures of any depth.
- **Visual Hierarchy**: Clear visual representation of data relationships with expandable/collapsible nodes.
- **Customizable**: Easy to modify styles, icons, and behaviors to fit your application's design.
- **Accessible**: Includes keyboard navigation support and proper ARIA attributes for screen readers.
- **Performance Optimized**: Efficient rendering of large data structures with React's memo and useCallback hooks.

## Running the Application Locally

To run this application on your local machine, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/ricarellano/databse-explorer.git
   cd database-explorer
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Run the development server:
   ```
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Customization

The Database Explorer component supports several customization options:

### Custom Icons

You can provide custom icons for different node types:

```tsx
import { Database, Table, Eye, Bot } from 'lucide-react'

const customIcons = {
  'db-system': <Database className="w-4 h-4" />,
  'db-project': <Database className="w-4 h-4" />,
  'table-model': <Table className="w-4 h-4" />,
  'table-view': <Eye className="w-4 h-4" />,
  'table-agent': <Bot className="w-4 h-4" />,
}

<DatabaseExplorer
  data={data}
  customIcons={customIcons}
/>

```

## API

### Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `TreeNode[]` | The hierarchical data to be displayed |
| `theme` | `Partial<Theme>` | Custom theme overrides |
| `customIcons` | `{ [key: string]: ReactNode }` | Custom icons for different node types |
| `initialExpandedNodes` | `string[]` | Array of node names to be initially expanded |

### TreeNode Interface

```typescript
interface TreeNode {
  name: string
  class: string
  type: string
  engine?: string | null
  deletable: boolean
  visible: boolean
  children?: TreeNode[]
}
```

## Accessibility

The Database Explorer component is built with accessibility in mind:

- Proper ARIA attributes are used to describe the tree structure.
- Keyboard navigation is supported:
  - Enter/Space: Toggle expand/collapse of a node
  - ArrowRight: Expand a collapsed node (if it has children)
  - ArrowLeft: Collapse an expanded node (if it has children)
  - ArrowDown: Move focus to the next visible node
  - ArrowUp: Move focus to the previous visible node
- Focus management is implemented for keyboard users.

## Performance

The component is optimized for performance:

- React.memo is used to prevent unnecessary re-renders.
- useCallback and useMemo hooks are used to memoize functions and values.
- Expanded state is managed efficiently using a Set.

## Technologies Used

- Next.js 15+
- React 19+
- TypeScript
- Tailwind CSS
- shadcn/ui
