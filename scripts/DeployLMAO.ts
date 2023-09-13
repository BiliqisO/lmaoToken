import { ethers } from "hardhat";

async function main() {
  const [account, account1] = await ethers.getSigners();
  const LMAOToken = await ethers.deployContract("LMAOToken");
  await LMAOToken.waitForDeployment();

  console.log(`deployed to ${LMAOToken.target}`);
  console.log(`deployer address to ${account.address}`);
}
async function main1() {
  const [account, account1] = await ethers.getSigners();
  const LMAOTokenAddr = "0x7Ce73F8f636C6bD3357A0A8a59e0ab6462C955B0";

  const interactwLMAOToken = await ethers.getContractAt(
    "IWLMAO",
    LMAOTokenAddr
  );
  const deployer = "0x04d7478fDF318C3C22cECE62Da9D78ff94807D77";
  const receiver = account1.address;
  await interactwLMAOToken.mint();
  const balanceOfDeployer = await interactwLMAOToken.balanceOf(deployer);
  console.log(`LMAObalance of Deployer Before Transfer: ${balanceOfDeployer}`);

  await interactwLMAOToken.transfer(receiver, ethers.parseUnits("100"));

  const balanceOfReceiverA = await interactwLMAOToken.balanceOf(receiver);
  console.log(`LMAObalance of Receiver After Transfer: ${balanceOfReceiverA}`);
  const balanceOfDeployerA = await interactwLMAOToken.balanceOf(deployer);
  console.log(`LMAObalance of Deployer After Transfer: ${balanceOfDeployerA}`);

  //   const deployer = account;
  //   const receiverSignature = account1;
  //   const receiver = account1.address;
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
