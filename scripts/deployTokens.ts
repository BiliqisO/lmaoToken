import { ethers } from "hardhat";

async function main() {
  const [account, account1, account2] = await ethers.getSigners();
  const LMAOToken = "0xfc073209b7936A771F77F63D42019a3a93311869";
  const deployer = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

  const WLMAOToken = await ethers.deployContract("WLMAOToken", [LMAOToken]);
  await WLMAOToken.waitForDeployment();
  console.log(`deployed to ${WLMAOToken.target}`);
  const interactwLMAOToken = await ethers.getContractAt("IWLMAO", LMAOToken);
  const receiver = account1.address;
  const balanceOfReceiverB = await interactwLMAOToken.balanceOf(receiver);
  console.log(`deployer address to ${receiver}`);
  console.log(
    `LMAObalance of Receiver Before depositing: ${balanceOfReceiverB}`
  );
  const balanceOfDeployerADEpo = await interactwLMAOToken.balanceOf(deployer);
  console.log(
    `LMAObalance of Deployer After Depositing: ${balanceOfDeployerADEpo}`
  );
}
async function main1() {
  const deployer = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const LMAOToken = "0xfc073209b7936A771F77F63D42019a3a93311869";
  const WLMAO = "0x8731d45ff9684d380302573cCFafd994Dfa7f7d3";

  const [account, account1, account2] = await ethers.getSigners();
  const receiverSignature = account1;
  const receiver = account1.address;

  const interactwLMAOToken = await ethers.getContractAt("IWLMAO", LMAOToken);

  const interactwWLMAOToken = await ethers.getContractAt("IWLMAO", WLMAO);

  const balanceOfReceiverB = await interactwLMAOToken.balanceOf(receiver);
  console.log(
    `LMAObalance of Receiver Before depositing: ${balanceOfReceiverB}`
  );
  await interactwLMAOToken
    .connect(receiverSignature)
    .approve(WLMAO, ethers.parseEther("1000"));
  await interactwWLMAOToken
    .connect(receiverSignature)
    .depositLMAO(ethers.parseEther("80"));

  const balanceOfReceiverALMAO = await interactwLMAOToken.balanceOf(receiver);
  console.log(
    `LMAObalance of Receiver After depositing: ${balanceOfReceiverALMAO}`
  );
  const balanceOfReceiverAWLMAO = await interactwWLMAOToken.balanceOf(WLMAO);
  console.log(
    `WLMAObalance of Receiver After depositing: ${balanceOfReceiverAWLMAO}`
  );
  const balanceOfDeployerADEpo = await interactwLMAOToken.balanceOf(deployer);
  console.log(
    `LMAObalance of Deployer After Depositing: ${balanceOfDeployerADEpo}`
  );
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
