export default async function handler(req, res) {
    const { code, state } = req.query; // Get authorization code and state from query parameters
  
    try {
      if (code) {
        // Exchange code for access token (using plain JavaScript for HTTP requests)
        const accessTokenResponse = await fetch(
          `https://www.linkedin.com/oauth/v2/accessToken`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code,
              redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
              client_id: process.env.LINKEDIN_CLIENT_ID,
              client_secret: process.env.LINKEDIN_CLIENT_SECRET, // Add client_secret
            }),
          }
        );
        const accessTokenData = await accessTokenResponse.json();
  
        // Get user information
        const userResponse = await fetch('https://api.linkedin.com/v2/me', {
          headers: {
            Authorization: `Bearer ${accessTokenData.access_token}`,
          },
        });
        const userData = await userResponse.json();
  
        // Store user name and email on blockchain (replace with your smart contract interaction logic)
        const stored = await storeUserDataOnBlockchain(userData.firstName, userData.email);
  
        res.redirect(process.env.FRONTEND_URL); // Redirect to frontend after successful storage
      } else {
        // Initial request for authorization URL
        const scope = 'r_liteprofile%20r_emailaddress%20w_member_social';
        const redirectUri = process.env.LINKEDIN_REDIRECT_URI;
        const clientId = process.env.LINKEDIN_CLIENT_ID;
  
        const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
  
        res.status(200).json({ redirectUrl: url });
      }
    } catch (error) {
      console.error('Error in Vercel function:', error);
      res.status(500).json({ error: 'Failed to handle LinkedIn authentication' });
    }
  }
  
// Assuming web3.min.js is included in your HTML with a CDN link (or alternative library)

async function storeUserDataOnBlockchain(firstName, email) {
    if (typeof window.web3 !== 'undefined') {
      const web3 = new Web3(window.web3.currentProvider);
  
      const contractAddress = process.env.address;
      const contractABI = JSON.parse(process.env.abi);
  
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
  