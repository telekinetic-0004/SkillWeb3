// script_common.js
// Function to enable LinkedIn button after successful MetaMask connection
async function connectWallet() {
    try {
        // Check if MetaMask is installed
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }

        // Request account access from MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0]; // Get user's Ethereum address
        console.log("The connected user is: ",userAddress);

        // Enable LinkedIn button upon successful connection
        document.getElementById('linkedinBtn').removeAttribute('disabled');
    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('An error occurred while connecting to MetaMask.');
    }
}

// Function to authenticate with LinkedIn
function authenticateWithLinkedIn() {
    // Redirect to LinkedIn authentication page
    window.location.href = '/auth/linkedin';
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

