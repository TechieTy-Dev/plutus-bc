// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  //BITCOIN CONTRACT 

  const Btc = await hre.ethers.getContractFactory("Btc");
  const btc = await Btc.deploy();

  await btc.deployed();

  console.log("Bitcoin deployed to:", btc.address);

//BNB CONTRACT 

  const Bnb = await hre.ethers.getContractFactory("Bnb");
  const bnb = await Bnb.deploy();

  await bnb.deployed();

  console.log("BNB deployed to:", bnb.address);

// ATOM CONTRACT

  const Atom = await hre.ethers.getContractFactory("Atom");
  const atom = await Atom.deploy();

  await atom.deployed();

  console.log("Cosmos deployed to:", atom.address);

  //AVAX CONTRACT

  const Avax = await hre.ethers.getContractFactory("Avax");
  const avax = await Avax.deploy();

  await avax.deployed();

  console.log("Avalanche deployed to:", avax.address);

  //DOT CONTRACT

  const Dot = await hre.ethers.getContractFactory("Dot");
  const dot = await Dot.deploy();

  await dot.deployed();

  console.log("Polkadot deployed to:", dot.address);

  //FTT CONTRACT

  const Ftt = await hre.ethers.getContractFactory("Ftt");
  const ftt = await Ftt.deploy();

  await ftt.deployed();

  console.log("FTX Token deployed to:", ftt.address);

  //LINK CONTRACT

  const Link = await hre.ethers.getContractFactory("Link");
  const link = await Link.deploy();

  await link.deployed();

  console.log("Chainlink deployed to:", link.address);

// MATIC CONTRACT

  const Matic = await hre.ethers.getContractFactory("Matic");
  const matic = await Matic.deploy();

  await matic.deployed();

  console.log("Polygon deployed to:", matic.address);

  //SOL CONTRACT

  const Sol = await hre.ethers.getContractFactory("Sol");
  const sol = await Sol.deploy();

  await sol.deployed();

  console.log("Solana deployed to:", sol.address);

  // UNI CONTRACT

  const Uni = await hre.ethers.getContractFactory("Uni");
  const uni = await Uni.deploy();

  await uni.deployed();

  console.log("Uniswap deployed to:", uni.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
