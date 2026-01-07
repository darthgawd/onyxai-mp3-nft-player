import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const INCLUDE_EXT = new Set([".js", ".mjs", ".cjs", ".ts", ".tsx", ".jsx"]);
const EXCLUDE_DIRS = new Set(["node_modules", "dist", "build", ".git", ".next", "coverage", ".turbo", ".vite"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else {
      const ext = path.extname(entry.name);
      if (!INCLUDE_EXT.has(ext)) continue;
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

// very lightweight function extractor (works well for JS/TS repos)
function extractFunctions(src) {
  const results = [];

  // function declarations: function name(
  const fnDecl = /(^|\n)\s*(export\s+)?(async\s+)?function\s+([A-Za-z0-9_$]+)\s*\(/g;
  // const name = (...) =>  OR  const name = async (...) =>
  const arrow = /(^|\n)\s*(export\s+)?(const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(async\s*)?\(/g;
  // class method: name( ... ) {   (naive)
  const method = /(^|\n)\s*([A-Za-z0-9_$]+)\s*\([^)]*\)\s*\{/g;

  let m;
  while ((m = fnDecl.exec(src))) results.push({ kind: "function", name: m[4] });
  while ((m = arrow.exec(src))) results.push({ kind: "arrow", name: m[4] });

  // methods will include a lot of false positives; we’ll keep them but label them “method? (naive)”
  while ((m = method.exec(src))) {
    const name = m[2];
    // skip obvious JS keywords and control blocks
    if (["if","for","while","switch","catch","function"].includes(name)) continue;
    results.push({ kind: "method?(naive)", name });
  }

  // de-dupe
  const seen = new Set();
  return results.filter(r => {
    const key = `${r.kind}:${r.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function rel(p) {
  return path.relative(ROOT, p);
}

const files = walk(ROOT);
let md = `# Repo Function Inventory\n\nGenerated: ${new Date().toISOString()}\n\n`;

for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  const fns = extractFunctions(src);

  md += `## ${rel(file)}\n\n`;
  if (!fns.length) {
    md += `- (no functions detected)\n\n`;
    continue;
  }
  for (const f of fns) {
    md += `- **${f.name}** (${f.kind})\n`;
  }
  md += `\n`;
}

const outPath = path.join(ROOT, "DOCS_FUNCTIONS.md");
fs.writeFileSync(outPath, md);
console.log(`Wrote ${outPath}`);
