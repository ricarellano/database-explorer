import { promises as fs } from 'fs';

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/lib/data.json', 'utf8');
  const data = JSON.parse(file);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Database Explorer</div>
    </main>
  )
}
