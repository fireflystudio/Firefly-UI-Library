import Image from "next/image";

/* The Figma avatar grid (rows of 4 / 5 / 4) cut into 13 rounded tiles. Positions are the tiles' x / y in
   the 1114×629 export, so the layout is the Figma one. */
const GRID_W = 1114;
const GRID_H = 629;
const TILE = 197;
const POSITIONS: ReadonlyArray<readonly [number, number]> = [
  [135, 0], [351, 0], [567, 0], [784, 0],
  [28, 216], [243, 216], [459, 216], [675, 216], [892, 216],
  [135, 432], [351, 432], [568, 432], [783, 432],
];

const SAMPLE_TILES: readonly string[] = [
  "r1c1", "r1c2", "r1c3", "r1c4",
  "r2c1", "r2c2", "r2c3", "r2c4", "r2c5",
  "r3c1", "r3c2", "r3c3", "r3c4",
].map((name) => `/images/steps/creators/${name}.webp`);

export type CreatorsGridProps = {
  /** Image URLs for the 13 tiles in reading order (rows of 4, 5 and 4). Defaults to sample portraits and publisher logos. */
  tiles?: readonly string[];
  /** Accessible description of the whole grid. */
  label?: string;
  className?: string;
};

/**
 * Verb Reader creators grid: 13 rounded tiles of portraits and publisher logos. Each tile grows a little
 * on hover and the neighbours overlap; the hover cell itself never moves, so the area does not flicker.
 * Fills the width of its box (aspect 1114 : 629).
 */
export function CreatorsGrid({ tiles = SAMPLE_TILES, label = "A grid of creator portraits and publisher logos", className = "" }: CreatorsGridProps) {
  return (
    <div role="img" aria-label={label} className={`relative w-full ${className}`} style={{ aspectRatio: `${GRID_W} / ${GRID_H}` }}>
      <div aria-hidden="true" className="absolute inset-0">
        {POSITIONS.map(([x, y], i) => (
          <div
            key={i}
            className="group absolute hover:z-10"
            style={{
              left: `${(x / GRID_W) * 100}%`,
              top: `${(y / GRID_H) * 100}%`,
              width: `${(TILE / GRID_W) * 100}%`,
              height: `${(TILE / GRID_H) * 100}%`,
            }}
          >
            <div className="relative size-full transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] will-change-transform group-hover:scale-[1.045] motion-reduce:transition-none">
              <div className="absolute inset-0 rounded-[12%] opacity-0 shadow-[0_8px_24px_rgb(0_0_0/0.12)] transition-opacity duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-100 motion-reduce:transition-none" />
              {tiles[i] ? <Image src={tiles[i]} alt="" fill unoptimized sizes="200px" className="rounded-[12%] object-cover" /> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
