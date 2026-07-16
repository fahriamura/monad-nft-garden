# Monad NFT Garden

A living NFT portfolio health dashboard for Monad. The sandbox is the interface: each NFT becomes a creature whose state reflects floor resilience, trade recency, holder spread, and trait or rarity signals.

## Run

```bash
npm install
npm run dev
```

The app runs on `http://127.0.0.1:3010` by default so it does not collide with other local Vite projects.

## What is implemented

- Wallet or collection input with deterministic analysis for offline demos.
- 20-NFT garden grid with unique deterministic creatures per token.
- Health filters for alive, watch, and dead.
- Clickable NFT detail modal with minter, floor ATH, current floor, holders, traits, rarity, mint supply, and score explanation.
- Reference image upload slot to demo the future image-to-image creature pipeline.
- Wallet connect, Monad Testnet network switching, contract read, and contract write actions.
- Solidity contract for storing generated sprite CIDs and health check-ins.

## Production wiring

Replace the mock data in `app.js` with:

1. Wallet NFT ownership from an indexer.
2. ERC-721 metadata and image URLs from token URI data.
3. Collection activity metrics from marketplace or indexer APIs.
4. One-time image-to-image generation per NFT, cached by `chainId:collection:tokenId`.
5. Frontend-only overlays for health changes so each NFT stays visually unique without regenerating every state.

## Monad deploy notes

Monad Testnet uses chain ID `10143`, symbol `MON`, and RPC `https://testnet-rpc.monad.xyz`.
Use `contracts/NFTGardenPassport.sol` as the minimal on-chain record for sprite and analysis CIDs.

Hardhat flow:

```bash
cp .env.example .env
npm run compile
npm run deploy:monad
```

After deploy, set `VITE_GARDEN_CONTRACT_ADDRESS` in `.env`, restart the dev server, then use the modal buttons:

- `Write check-in` stores `collection`, `tokenId`, `healthScore`, `spriteCid`, and `dataCid`.
- `Read on-chain` reads the stored check-in by the same collection and token ID.

Verify after deploy:

```bash
npm run verify:monad -- <deployed_contract_address>
```

Official references:

- Deploy contracts: https://docs.monad.xyz/guides/deploy-smart-contract/index
- Verify contracts: https://docs.monad.xyz/guides/verify-smart-contract/index
- Network info: https://docs.monad.xyz/developer-essentials/testnets
