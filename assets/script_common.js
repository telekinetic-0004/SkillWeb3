// script_common.js
// Function to enable LinkedIn button after successful MetaMask connection
async function connectWallet() {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed or not detected');
      }
  
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      console.log("The connected user is:", userAddress);
  
      const linkedInButton = document.getElementById('linkedinBtn');
      if (linkedInButton) {
        // Remove the disabled attribute if the element is found
        linkedInButton.removeAttribute('disabled');
      } else {
        // Log an error message if the element is not found
        console.error('Element with the ID "linkedinBtn" not found in the DOM.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      if (error.code === 4001) {
        alert('Connect request rejected by user. Please approve the request to continue.');
      } else {
        alert('An error occurred while connecting to MetaMask: ' + error.message);
      }
    }
  }

async function authenticateWithLinkedIn() {
    const vercelFunctionUrl = 'https://skill-web3.vercel.app/api/linkedinAuth';
    const state = crypto.randomUUID(); // Generate a random state string
  
    try {
        const response = await fetch(`${vercelFunctionUrl}?state=${state}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch redirect URL: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data || !data.redirectUrl) {
            throw new Error('Invalid response format from server');
        }

        // Redirect to LinkedIn authorization page
        window.location.href = data.redirectUrl;
    } catch (error) {
        console.error('Error fetching redirect URL:', error);
        alert('An error occurred while fetching the redirect URL.');
    }
}



// Function to make payment using MetaMask
async function makePayment() {
    try {
        // Check if LinkedIn authentication is successful
        if (!checkLinkedInAuthentication()) {
            throw new Error('Please login with LinkedIn first.');
        }

        // Check if MetaMask is installed
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }

        // Request account access from MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0]; // Get user's Ethereum address

        // Implement logic to make payment (e.g., transfer 1 ETH to a specific address)
        const transaction = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: userAddress,
                to: '0xad71560099fbC33D35c726e75f69aA66d6dbBE69', // Replace with the address where you want to receive the payment
                value: '0x' + (1e18).toString(16) // 1 ETH in wei //0.01 for testing purposes
            }]
        });
        alert('Payment successful!');
    } catch (error) {
        console.error('Error making payment:', error);
        alert('An error occurred while making payment.');
    }
}

// Function to check if LinkedIn authentication is successful
function checkLinkedInAuthentication() {
    // Check if the LinkedIn login button is disabled
    return !document.getElementById('linkedinBtn').disabled;
}

