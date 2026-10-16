/**
 * Generates the shadcn-style registry from the catalogue metadata:
 *   public/r/<id>.json   — one registry item per component, file contents inlined
 *   public/r/registry.json — index of all items (no contents)
 *
 * Run: npm run registry:build  (also runs before every `next build`)
 */
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { getItems } from "../lib/catalogue";
import { REGISTRY_URL } from "../lib/registry-url";

async function main() {
const root = process.cwd();
const outDir = join(root, "public", "r");
const ITEMS = await getItems();

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const index = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "firefly",
  homepage: REGISTRY_URL,
  items: [] as unknown[],
};

for (const item of ITEMS) {
  const files = item.files.map((f) => ({
    path: f.path,
    type: f.type,
    target: f.target,
    content: readFileSync(join(root, f.path), "utf8"),
  }));

  // `registryDependencies` is deliberately NOT emitted: shadcn would re-download and overwrite
  // firefly-base on every section install (and fail while the catalogue is offline). Sites install
  // the base once, explicitly; the catalogue shows the requirement from `meta.registryDependencies`.
  const registryItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.id,
    type: "registry:block",
    title: `${item.name} v${item.version}`,
    description: item.description,
    ...(item.dependencies?.length ? { dependencies: item.dependencies } : {}),
    files,
  };

  writeFileSync(join(outDir, `${item.id}.json`), JSON.stringify(registryItem, null, 2) + "\n");
  index.items.push({
    name: item.id,
    type: "registry:block",
    title: registryItem.title,
    description: item.description,
    ...(item.dependencies?.length ? { dependencies: item.dependencies } : {}),
    files: item.files.map((f) => ({ path: f.path, type: f.type, target: f.target })),
  });
  console.log(`✓ ${item.id} (${files.length} ${files.length === 1 ? "file" : "files"})`);
}

writeFileSync(join(outDir, "registry.json"), JSON.stringify(index, null, 2) + "\n");
console.log(`\nRegistry written to public/r (${ITEMS.length} items) for ${REGISTRY_URL}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
