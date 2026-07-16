import { ethers } from "hardhat";

async function main() {
  const Garden = await ethers.getContractFactory("NFTGardenPassport");
  const garden = await Garden.deploy();
  await garden.waitForDeployment();

  console.log(`NFTGardenPassport deployed to ${await garden.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
