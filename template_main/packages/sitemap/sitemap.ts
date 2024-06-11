import yaml from 'js-yaml'
import fs from 'fs'

// Get document, or throw exception on error
try {
  const doc = yaml.load(fs.readFileSync('./sitemap.yml', 'utf8'))

  const data = JSON.stringify(doc, null, 2)
  fs.writeFileSync('./sitemap.json', data)
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e)
}
