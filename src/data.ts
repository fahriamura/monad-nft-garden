export type Status = "alive" | "watch" | "dead";

export type NftHealth = {
  id: number;
  tokenId: number;
  name: string;
  seed: number;
  score: number;
  status: Status;
  floorAth: number;
  floorNow: number;
  trades: number;
  holders: number;
  traits: number;
  rarity: number;
  mints: number;
  minter: string;
  colors: [string, string];
  size: number;
  tilt: number;
};

const names = [
  "Molandak Bloom",
  "Chog Seedling",
  "Purple Hatch",
  "Block Sprite",
  "Gas Fern",
  "Moyaki Pod",
  "Nonce Bud",
  "Parallel Root",
  "Mint Wisp",
  "Trait Moss",
  "Monadling",
  "Rarity Beet",
  "Finality Dew",
  "Pixel Bract",
  "Holder Vine",
  "Floor Sprout",
  "Epoch Bulb",
  "Calldata Puff",
  "Archive Leaf",
  "Bloom Blob",
];

const palette: Array<[string, string]> = [
  ["#f45fa5", "#91f36c"],
  ["#86d5ff", "#f3c45b"],
  ["#c184ff", "#61e3a5"],
  ["#ff7b54", "#f4df6a"],
  ["#69f0d8", "#a8ff60"],
  ["#ff8bd1", "#6bd3ff"],
];

export function hashString(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function randomFrom(seed: number, min: number, max: number) {
  const value = Math.sin(seed) * 10000;
  return Math.floor((value - Math.floor(value)) * (max - min + 1)) + min;
}

export function makeCollection(seedText: string): NftHealth[] {
  const base = hashString(seedText || "monad");
  return names.map((name, index) => {
    const seed = base + index * 9973;
    const floorAth = randomFrom(seed, 4, 18) + randomFrom(seed + 3, 0, 9) / 10;
    const floorNow = Math.max(0.2, floorAth * (randomFrom(seed + 1, 34, 94) / 100));
    const trades = randomFrom(seed + 2, 0, 82);
    const holders = randomFrom(seed + 4, 110, 4200);
    const traits = randomFrom(seed + 5, 4, 14);
    const rarity = randomFrom(seed + 6, 1, 980);
    const mints = randomFrom(seed + 7, 18, 9900);
    const resilience = Math.round((floorNow / floorAth) * 100);
    const tradeScore = Math.min(100, trades * 2);
    const holderScore = Math.min(100, Math.round(holders / 42));
    const rarityScore = Math.max(20, 100 - Math.round(rarity / 10));
    const score = Math.round(resilience * 0.4 + tradeScore * 0.25 + holderScore * 0.2 + rarityScore * 0.15);
    const status: Status = score >= 70 ? "alive" : score >= 46 ? "watch" : "dead";
    const pair = palette[index % palette.length];

    return {
      id: index + 1,
      tokenId: 1000 + index,
      name,
      seed,
      score,
      status,
      floorAth,
      floorNow,
      trades,
      holders,
      traits,
      rarity,
      mints,
      minter: `0x${(seed.toString(16) + "ab12cd34ef56").slice(0, 12)}...${(seed * 17).toString(16).slice(-4)}`,
      colors: pair,
      size: randomFrom(seed + 8, 54, 86),
      tilt: randomFrom(seed + 9, -7, 7),
    };
  });
}

export function statusLabel(status: Status) {
  if (status === "alive") return "Alive";
  if (status === "watch") return "Watch";
  return "Dead";
}

export function buildReason(nft: NftHealth) {
  if (nft.status === "alive") {
    return "Healthy floor retention, enough recent trades, and broad holder spread make this collection look active instead of abandoned.";
  }
  if (nft.status === "watch") {
    return "The NFT still has measurable holder depth, but floor retention or trade recency is weakening. It deserves a manual check.";
  }
  return "Weak trade recency and poor floor retention pushed this into dead territory. Holder count alone is not enough to keep it healthy.";
}
