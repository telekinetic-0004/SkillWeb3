document.addEventListener('DOMContentLoaded', async function() {
    // Function to enable Google sign-in button after successful MetaMask connection
    async function connectWallet() {
        try {
            // Check if MetaMask is installed
            if (typeof window.ethereum === 'undefined') {
                throw new Error('MetaMask is not installed or not detected');
            }

            // Request account access from MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const userAddress = accounts[0];
            console.log("The connected user address is:", userAddress);

            // Update the DOM to display the connected user address
            const userAddressSpan = document.getElementById('userAddress');
            if (userAddressSpan) {
                userAddressSpan.textContent = userAddress;
            }

            // Update the "Connect Wallet" button's text content to "Connected: ..."
            const connectWalletBtn = document.getElementById('connectWalletBtn');
            connectWalletBtn.textContent = `Connected: ${userAddress}`;

            // Disable the button after successful connection
            connectWalletBtn.disabled = true;

            // Enable the "Sign in with Google" button
            const googleSignInBtn = document.getElementById('googleSignInBtn');
            googleSignInBtn.disabled = false;

            // Fetch additional user details (name and email) and display them
            const auth0 = new auth0.WebAuth({
                domain: 'dev-1lhu6wr3urnf83ul.us.auth0.com',
                clientID: 'jTYAK1RXiJkjjQPDClv2ymDfrcvJrUYv',
                responseType: 'token id_token',
                scope: 'openid profile email',
            });

            auth0.parseHash(function(err, authResult) {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    auth0.client.userInfo(authResult.accessToken, function(err, user) {
                        if (user) {
                            const userFullNameSpan = document.getElementById('userFullName');
                            if (userFullNameSpan) {
                                userFullNameSpan.textContent = user.name;
                            }

                            const userEmailSpan = document.getElementById('userEmailAddress');
                            if (userEmailSpan) {
                                userEmailSpan.textContent = user.email;
                            }
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error connecting wallet:', error);
            if (error.code === 4001) {
                alert('Connect request rejected by user. Please approve the request to continue.');
            } else {
                alert('An error occurred while connecting to MetaMask: ' + error.message);
            }
        }
    }

    // Add a click event listener to the connect wallet button
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', connectWallet);
    } else {
        console.error("Button with id 'connectWalletBtn' not found in the DOM.");
    }

    // Load the Auth0 script asynchronously
    const script = document.createElement('script');
    script.src = 'https://cdn.auth0.com/js/auth0/9.19/auth0.min.js';
    script.async = true;
    script.onload = function() {
        // Execute the connectWallet function only after the Auth0 script is loaded
        connectWallet();
    };
    document.head.appendChild(script);
});



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

