import { promises as fs } from 'fs';
import DatabaseExplorer from '@/components/DatabaseExplorer'
import { Database, Table, Eye, Bot } from 'lucide-react'

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/lib/data.json', 'utf8');
  const data = JSON.parse(file);

  const customTheme = {
    background: 'bg-gray-100',
    text: 'text-blue-900',
    badge: {
      model: 'bg-pink-100 text-pink-800',
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DatabaseExplorer
        data={data}
        theme={customTheme}
        initialExpandedNodes={['2']}
      />
    </main>
  )
}
