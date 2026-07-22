const fs = require('fs')
const path = require('path')
const glob = require('glob')

// Walk all .tsx and .ts files in src/
const files = glob.sync('src/**/*.{tsx,ts}', { cwd: __dirname, absolute: true })

const replacements = [
  // sage → surface
  [/sage-/g, 'surface-'],
  // warm → primary
  [/warm-/g, 'primary-'],
  // cream → surface
  [/cream-/g, 'surface-'],
  // card-shadow-lg → card card-lg
  [/card-shadow-lg/g, 'card card-lg'],
  // card-shadow → card
  [/card-shadow/g, 'card'],
  // LoadingSkeleton bg-sage-100 → bg-surface-100
  [/bg-surface-100/g, 'bg-surface-100'],
]

let total = 0
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8')
  let changed = false
  for (const [from, to] of replacements) {
    if (from.test(content)) {
      content = content.replace(from, to)
      changed = true
    }
  }
  if (changed) {
    fs.writeFileSync(file, content, 'utf8')
    total++
    console.log('✓', path.relative(__dirname, file))
  }
}
console.log(`\nUpdated ${total} files.`)
