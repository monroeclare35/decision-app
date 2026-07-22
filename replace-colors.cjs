const fs = require('fs')
const path = require('path')

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p, files)
    else if (/\.(tsx|ts|css)$/.test(entry.name)) files.push(p)
  }
  return files
}

const srcDir = path.join(__dirname, 'src')
const files = walk(srcDir)
let count = 0

const rules = [
  [/sage-/g, 'surface-'],
  [/warm-/g, 'primary-'],
  [/cream-/g, 'surface-'],
  [/card-shadow-lg/g, 'card card-lg'],
  [/card-shadow(?!-lg)/g, 'card'],
]

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8')
  let changed = false
  for (const [from, to] of rules) {
    if (from.test(content)) {
      content = content.replace(from, to)
      changed = true
    }
  }
  if (changed) {
    fs.writeFileSync(file, content, 'utf8')
    count++
    console.log('✓', path.relative(__dirname, file))
  }
}
console.log(`\nUpdated ${count} files.`)
