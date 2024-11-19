import { promises as fs } from 'fs';
import DatabaseExplorer from '@/components/DatabaseExplorer'
import { Database, Table, Eye, Bot } from 'lucide-react'

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/lib/data.json', 'utf8');
  const data = JSON.parse(file);

  const customIcons = {
    'db-system': <Database className="w-4 h-4" />,
    'db-project': <Database className="w-4 h-4" />,
    'table-model': <Table className="w-4 h-4" />,
    'table-view': <Eye className="w-4 h-4" />,
    'table-agent': <Bot className="w-4 h-4" />,
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DatabaseExplorer
        data={data}
        customIcons={customIcons}
        initialExpandedNodes={['mindsdb']}
      />
    </main>
  )
}
