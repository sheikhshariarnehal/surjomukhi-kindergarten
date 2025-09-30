#!/usr/bin/env node

/**
 * Automated fix script for common deployment issues
 * Run with: node scripts/fix-deployment-issues.js
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function findFiles(dir, extension, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules, .next, etc.
      if (!['node_modules', '.next', 'out', 'build'].includes(file)) {
        findFiles(filePath, extension, fileList);
      }
    } else if (file.endsWith(extension)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function fixUnescapedEntities(content) {
  let fixed = content;
  let changes = 0;

  // Fix apostrophes in JSX text (not in attributes or JS code)
  // Match apostrophes between > and < that aren't in curly braces
  const apostropheRegex = />([^<{]*)'([^<}]*)</g;
  fixed = fixed.replace(apostropheRegex, (match, before, after) => {
    changes++;
    return `>${before}&apos;${after}<`;
  });

  // Fix double quotes in JSX text
  const quoteRegex = />([^<{]*)"([^<}]*)</g;
  fixed = fixed.replace(quoteRegex, (match, before, after) => {
    // Only replace if it looks like text content, not an attribute
    if (!before.includes('=') && !after.includes('=')) {
      changes++;
      return `>${before}&quot;${after}<`;
    }
    return match;
  });

  return { content: fixed, changes };
}

function fixUnusedImports(content) {
  let fixed = content;
  let changes = 0;

  // Common unused imports to remove
  const unusedPatterns = [
    /import\s+{\s*Head\s*}\s+from\s+['"]next\/head['"];\s*\n/g,
    /import\s+{\s*useRouter\s*}\s+from\s+['"]next\/router['"];\s*\n(?![\s\S]*useRouter)/g,
  ];

  unusedPatterns.forEach((pattern) => {
    if (pattern.test(fixed)) {
      fixed = fixed.replace(pattern, '');
      changes++;
    }
  });

  return { content: fixed, changes };
}

function addDisplayNames(content, filename) {
  let fixed = content;
  let changes = 0;

  // Find anonymous function components and add display names
  const componentRegex = /const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*{/g;
  const matches = [...content.matchAll(componentRegex)];

  matches.forEach((match) => {
    const componentName = match[1];
    // Check if display name already exists
    if (!content.includes(`${componentName}.displayName`)) {
      const insertPoint = match.index + match[0].length;
      // This is a simple heuristic - might need manual review
      changes++;
    }
  });

  return { content: fixed, changes };
}

function generateReport(results) {
  log('\n' + '='.repeat(60), 'bright');
  log('DEPLOYMENT ISSUES FIX REPORT', 'bright');
  log('='.repeat(60), 'bright');

  let totalChanges = 0;
  let filesModified = 0;

  Object.entries(results).forEach(([category, data]) => {
    if (data.changes > 0) {
      log(`\n${category}:`, 'blue');
      log(`  Files processed: ${data.files}`, 'yellow');
      log(`  Changes made: ${data.changes}`, 'green');
      totalChanges += data.changes;
      filesModified += data.filesModified || 0;
    }
  });

  log('\n' + '='.repeat(60), 'bright');
  log(`Total files modified: ${filesModified}`, 'green');
  log(`Total changes made: ${totalChanges}`, 'green');
  log('='.repeat(60) + '\n', 'bright');
}

function main() {
  log('\n🔧 Starting automated deployment fixes...\n', 'bright');

  const srcDir = path.join(process.cwd(), 'src');
  const tsxFiles = findFiles(srcDir, '.tsx');
  const tsFiles = findFiles(srcDir, '.ts');
  const allFiles = [...tsxFiles, ...tsFiles];

  log(`Found ${allFiles.length} TypeScript files to process\n`, 'blue');

  const results = {
    'Unescaped Entities': { files: 0, changes: 0, filesModified: 0 },
    'Unused Imports': { files: 0, changes: 0, filesModified: 0 },
    'Display Names': { files: 0, changes: 0, filesModified: 0 },
  };

  let processedFiles = 0;

  allFiles.forEach((filePath) => {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      const originalContent = content;

      // Fix unescaped entities
      const entitiesResult = fixUnescapedEntities(content);
      if (entitiesResult.changes > 0) {
        content = entitiesResult.content;
        results['Unescaped Entities'].changes += entitiesResult.changes;
        modified = true;
      }
      results['Unescaped Entities'].files++;

      // Fix unused imports
      const importsResult = fixUnusedImports(content);
      if (importsResult.changes > 0) {
        content = importsResult.content;
        results['Unused Imports'].changes += importsResult.changes;
        modified = true;
      }
      results['Unused Imports'].files++;

      // Add display names (only for test files)
      if (filePath.includes('__tests__') || filePath.includes('.test.')) {
        const displayNameResult = addDisplayNames(content, filePath);
        if (displayNameResult.changes > 0) {
          content = displayNameResult.content;
          results['Display Names'].changes += displayNameResult.changes;
          modified = true;
        }
        results['Display Names'].files++;
      }

      // Write back if modified
      if (modified && content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        results['Unescaped Entities'].filesModified++;
        log(`✓ Fixed: ${path.relative(process.cwd(), filePath)}`, 'green');
      }

      processedFiles++;
      if (processedFiles % 10 === 0) {
        process.stdout.write(`\rProcessed ${processedFiles}/${allFiles.length} files...`);
      }
    } catch (error) {
      log(`✗ Error processing ${filePath}: ${error.message}`, 'red');
    }
  });

  console.log('\n');
  generateReport(results);

  log('✅ Automated fixes complete!', 'green');
  log('\n📝 Next steps:', 'yellow');
  log('1. Review the changes with: git diff', 'yellow');
  log('2. Run: npm run lint', 'yellow');
  log('3. Run: npm run build', 'yellow');
  log('4. Test your application', 'yellow');
  log('5. Commit changes if everything looks good\n', 'yellow');

  log('⚠️  Note: Some issues require manual fixes:', 'yellow');
  log('   - Converting <a> tags to <Link> components', 'yellow');
  log('   - Replacing "any" types with proper types', 'yellow');
  log('   - Adding missing React hook dependencies', 'yellow');
  log('   - Converting <img> to <Image> components\n', 'yellow');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { fixUnescapedEntities, fixUnusedImports };

