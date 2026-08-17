/**
 * Generates abstract cover art for project tiles that have no screenshot.
 *
 * These are deliberately non-representational: they must never be mistaken for
 * screenshots of a real product. Each cover is built from the same visual
 * system (gradient ground, soft highlight, thin technical grid, one geometric
 * motif) so the project row reads as one set.
 *
 * Run: npm run gen:covers
 */
import { mkdir, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const OUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'projects', 'covers');

const W = 1200;
const H = 750;

/** Deterministic PRNG so regenerating produces byte-identical files. */
const rng = (seed) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const grid = (opacity) => {
  const lines = [];
  for (let x = 0; x <= W; x += 60) {
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" />`);
  }
  for (let y = 0; y <= H; y += 60) {
    lines.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" />`);
  }
  return `<g stroke="#fff" stroke-width="1" opacity="${opacity}">${lines.join('')}</g>`;
};

/** Concentric orbital rings with nodes — automation / inference. */
const orbits = (seed) => {
  const rand = rng(seed);
  const cx = W * 0.62;
  const cy = H * 0.5;
  const parts = [];

  for (let i = 0; i < 5; i++) {
    const r = 70 + i * 62;
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#fff" stroke-width="1.5" opacity="${(0.42 - i * 0.06).toFixed(2)}" />`);

    const count = 2 + i;
    for (let n = 0; n < count; n++) {
      const angle = rand() * Math.PI * 2;
      const nx = cx + Math.cos(angle) * r;
      const ny = cy + Math.sin(angle) * r;
      parts.push(`<circle cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" r="${(4 + rand() * 5).toFixed(1)}" fill="#fff" opacity="${(0.5 + rand() * 0.4).toFixed(2)}" />`);
    }
  }
  parts.push(`<circle cx="${cx}" cy="${cy}" r="16" fill="#fff" opacity="0.9" />`);
  return parts.join('');
};

/** A connected node network flowing left to right — supply chain. */
const network = (seed) => {
  const rand = rng(seed);
  const cols = 6;
  const rows = 4;
  const nodes = [];
  const edges = [];

  for (let c = 0; c < cols; c++) {
    const colNodes = [];
    const count = 1 + Math.floor(rand() * rows);
    for (let r = 0; r < count; r++) {
      colNodes.push({
        x: 120 + c * ((W - 240) / (cols - 1)),
        y: 130 + rand() * (H - 260)
      });
    }
    nodes.push(colNodes);
  }

  for (let c = 0; c < cols - 1; c++) {
    for (const a of nodes[c]) {
      for (const b of nodes[c + 1]) {
        if (rand() > 0.45) {
          edges.push(`<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" />`);
        }
      }
    }
  }

  const dots = nodes
    .flat()
    .map((n) => `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="9" fill="#fff" opacity="0.85" />`)
    .join('');

  return `<g stroke="#fff" stroke-width="1.5" opacity="0.4">${edges.join('')}</g>${dots}`;
};

/** Soft nested arcs — calm, restorative. */
const waves = (seed) => {
  const rand = rng(seed);
  const parts = [];
  for (let i = 0; i < 9; i++) {
    const y = 120 + i * 70;
    const amp = 26 + rand() * 30;
    const d = `M -50 ${y} C ${W * 0.25} ${y - amp}, ${W * 0.55} ${y + amp}, ${W + 50} ${y - amp * 0.4}`;
    parts.push(`<path d="${d}" fill="none" stroke="#fff" stroke-width="${(1 + rand() * 2).toFixed(1)}" opacity="${(0.5 - i * 0.035).toFixed(2)}" />`);
  }
  return parts.join('');
};

/** Nested rounded frames — layered controls and audit trails. */
const layers = (seed) => {
  const rand = rng(seed);
  const parts = [];
  for (let i = 0; i < 7; i++) {
    const inset = 60 + i * 45;
    const w = W - inset * 2;
    const h = H - inset * 1.35;
    if (w <= 0 || h <= 0) break;
    parts.push(`<rect x="${inset}" y="${(inset * 0.7).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${(28 - i * 3).toFixed(1)}" fill="none" stroke="#fff" stroke-width="1.5" opacity="${(0.45 - i * 0.05).toFixed(2)}" />`);
  }
  for (let i = 0; i < 14; i++) {
    parts.push(`<circle cx="${(rand() * W).toFixed(1)}" cy="${(rand() * H).toFixed(1)}" r="${(2 + rand() * 3).toFixed(1)}" fill="#fff" opacity="0.5" />`);
  }
  return parts.join('');
};

const MOTIFS = { orbits, network, waves, layers };

const COVERS = [
  { slug: 'toothy-ai', from: '#2B2F77', to: '#6C5CE0', motif: 'orbits', seed: 1207 },
  { slug: 'revconductor', from: '#6B3410', to: '#C98B2E', motif: 'network', seed: 4409 },
  { slug: 'temple-day-spa', from: '#5C3A4E', to: '#B07A94', motif: 'waves', seed: 8821 },
  { slug: 'lahebo', from: '#2E3A4F', to: '#5B7BA6', motif: 'layers', seed: 3355 }
];

const buildSvg = ({ from, to, motif, seed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Abstract cover artwork">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}" />
      <stop offset="100%" stop-color="${to}" />
    </linearGradient>
    <radialGradient id="h" cx="0.7" cy="0.3" r="0.75">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.28" />
      <stop offset="100%" stop-color="#fff" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)" />
  ${grid(0.07)}
  <rect width="${W}" height="${H}" fill="url(#h)" />
  ${MOTIFS[motif](seed)}
</svg>
`;

await mkdir(OUT_DIR, { recursive: true });

for (const cover of COVERS) {
  const file = path.join(OUT_DIR, `${cover.slug}.svg`);
  await writeFile(file, buildSvg(cover), 'utf8');
  console.log(`[covers] ${cover.slug}.svg  ${cover.from} -> ${cover.to}  (${cover.motif})`);
}

console.log(`[covers] Wrote ${COVERS.length} covers to ${OUT_DIR}`);
