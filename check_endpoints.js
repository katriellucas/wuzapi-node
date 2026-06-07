const fs = require('fs');
const path = require('path');

const specPath = path.join(__dirname, 'openapi-spec.yml');
const modulesDir = path.join(__dirname, 'src', 'modules');

const specContent = fs.readFileSync(specPath, 'utf8');

const specEndpoints = [];
let currentPath = null;
const lines = specContent.split('\n');
for (const line of lines) {
  if (line.startsWith('  /') && line.endsWith(':')) {
    currentPath = line.trim().slice(0, -1);
  } else if (currentPath && line.startsWith('    ') && !line.startsWith('     ')) {
    const methodMatch = line.match(/^    (get|post|put|delete|patch):/);
    if (methodMatch) {
      specEndpoints.push(`${methodMatch[1].toUpperCase()} ${currentPath}`);
    }
  } else if (line.startsWith('components:') || line.startsWith('definitions:')) {
    break; // end of paths
  }
}

const implEndpoints = [];
const methodRegex = /this\.(get|post|put|delete)(?:<[^>]+>)?\(\s*["'`]?([^"'`?,)]+)["'`]?/g;

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      let match;
      while ((match = methodRegex.exec(content)) !== null) {
        let route = match[2];
        // replace dynamic paths like ${id} with {id}
        route = route.replace(/\$\{.*?\}/g, '{id}');
        // some routes might start with backtick and have query strings
        route = route.split('?')[0].replace(/^`/, '').replace(/`$/, '');
        implEndpoints.push(`${match[1].toUpperCase()} ${route}`);
      }
    }
  }
}

scanDir(modulesDir);

// Standardize route parameters for comparison
function standardizeRoute(route) {
  return route.replace(/\{[^}]+\}/g, '{}');
}

const specSet = new Set(specEndpoints.map(standardizeRoute));
const implSet = new Set(implEndpoints.map(standardizeRoute));

const missingInImpl = specEndpoints.filter(e => !implSet.has(standardizeRoute(e)));
const missingInSpec = implEndpoints.filter(e => !specSet.has(standardizeRoute(e)));

console.log('Endpoints in OpenAPI Spec but not in Implementation:');
missingInImpl.forEach(e => console.log('  ' + e));

console.log('\nEndpoints in Implementation but not in OpenAPI Spec:');
missingInSpec.forEach(e => console.log('  ' + e));
