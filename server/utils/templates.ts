import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

export type TemplateMeta = {
  name: string
  label: string
  description?: string
}

const templatesDir = path.resolve(process.cwd(), 'templates')

export function getAllTemplateMetas(): TemplateMeta[] {
  if (!existsSync(templatesDir)) return []

  const dirs = readdirSync(templatesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

  const result: TemplateMeta[] = []

  for (const dir of dirs) {
    const metaPath = path.join(templatesDir, dir, 'template.meta.json')
    if (!existsSync(metaPath)) continue

    const raw = readFileSync(metaPath, 'utf-8')
    const meta = JSON.parse(raw)

    if (!meta?.name || !meta?.label) continue

    result.push({
      name: String(meta.name),
      label: String(meta.label),
      description: meta.description ? String(meta.description) : undefined
    })
  }

  return result
}

export function ensureTemplateExists(templateName: string) {
  const found = getAllTemplateMetas().some((item) => item.name === templateName)
  if (!found) {
    throw new Error(`Unknown template: ${templateName}`)
  }
}
