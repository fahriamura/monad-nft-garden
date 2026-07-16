import { ethers } from "ethers";

export const MONAD_TESTNET = {
  chainId: "0x279f",
  chainName: "Monad Testnet",
  nativeCurrency: {
    name: "Monad",
    symbol: "MON",
    decimals: 18,
  },
  rpcUrls: [import.meta.env.VITE_MONAD_RPC_URL || "https://testnet-rpc.monad.xyz"],
  blockExplorerUrls: ["https://testnet.monadexplorer.com"],
};

export const GARDEN_CONTRACT_ADDRESS =
  import.meta.env.VITE_GARDEN_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

export const GARDEN_ABI = [
  "function owner() view returns (address)",
  "function checkIns(bytes32) view returns (uint64 updatedAt, uint16 healthScore, string spriteCid, string dataCid)",
  "function checkIn(address collection, uint256 tokenId, uint16 healthScore, string spriteCid, string dataCid)",
  "function transferOwnership(address nextOwner)",
  "event GardenCheckedIn(address indexed collection, uint256 indexed tokenId, uint16 healthScore, string spriteCid, string dataCid)",
];

export function getCheckInKey(collection: string, tokenId: number | bigint) {
  return ethers.keccak256(
    ethers.AbiCoder.defaultAbiCoder().encode(["address", "uint256"], [collection, BigInt(tokenId)]),
  );
}
