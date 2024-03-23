// Assuming web3.min.js is included in your HTML with a CDN link (or alternative library)

async function storeUserDataOnBlockchain(firstName, email) {
    if (typeof window.web3 !== 'undefined') {
      const web3 = new Web3(window.web3.currentProvider);
  
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      const contractABI = JSON.parse(process.env.REACT_APP_CONTRACT_ABI);
  
      const contract = new web3.eth.Contract(contractABI, contractAddress);
  
      try {
        const tx = await contract.methods.storeUserData(firstName, email).send({
          from: window.ethereum.selectedAddress,
          gas: 1000000, // Adjust gas limit as needed
        });
  
        console.log('Transaction hash:', tx.transactionHash);
        return true; // Indicate successful transaction initiation
      } catch (error) {
        console.error('Error storing data on blockchain:', error);
        return false;
      }
    } else {
      console.error('Web3 library not available');
      return false; // Indicate web3 library not found
    }
  }
  
  export default async function handler(req, res) {
    // ... Rest of your Vercel function code to handle authentication and extract user data ...
    
    const stored = await storeUserDataOnBlockchain(userData.firstName, userData.email);
    
    if (stored) {
      res.redirect(process.env.FRONTEND_URL); // Redirect to frontend on success
    } else {
      res.status(500).json({ error: 'Failed to store user data' });
    }
  }
  