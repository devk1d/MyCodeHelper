const helper = {};

/* 
{
    fromPrivateKey: '',
    to: '',
    amount: 0,
    contractAddress: '',
    provider: '',
}
*/

helper.sendToken = async (obj) => {
    const fromPrivateKey = obj.fromPrivateKey;
    const to = obj.to;
    const amount = obj.amount + "";
    const contractAddress = obj.contractAddress;
    const provider = obj.provider;

    let res;
    let wallet = new ethers.Wallet(fromPrivateKey)
    let walletSigner = wallet.connect(provider)

    if (contractAddress) {
        const send_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"}];

        // general token send
        let contract = new ethers.Contract(
          contractAddress,
          send_abi,
          walletSigner
        )

        // console.log(contract);
        // How many tokens?
        const decimals = await contract.decimals();
        // console.log(decimals);
        let numberOfTokens = ethers.utils.parseUnits(amount, decimals);
        
        // console.log(`numberOfTokens: ${numberOfTokens}`)
        // Send tokens
        res = await contract.transfer(to, numberOfTokens)
    } else {
        const tx = {
          from: wallet.address,
          to: to,
          value: ethers.utils.parseEther(amount),
        }

        try {
          res = walletSigner.sendTransaction(tx)
        } catch (error) {
          alert("failed to send!!")
        }
    }

    //console.log(res)
    const tx = await res.wait();

    return tx;
}




module.exports = helper;
