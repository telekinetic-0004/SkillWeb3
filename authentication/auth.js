// Check if the Auth0 library is available
if (typeof auth0 === 'undefined' || !auth0.WebAuth) {
    console.error('Auth0 library not loaded properly');
} else {
    // Auth0 library is available, proceed with initialization
    var auth0 = new auth0.WebAuth({
        domain: 'dev-1lhu6wr3urnf83ul.us.auth0.com',
        clientID: 'jTYAK1RXiJkjjQPDClv2ymDfrcvJrUYv',
        redirectUri: 'https://skill-web3.vercel.app/home.html',
        responseType: 'token id_token',
        scope: 'openid profile email'
    });

    // Check if the Google Sign-in button is available
    var googleSignInBtn = document.getElementById('googleSignInBtn');
    if (googleSignInBtn) {
        // Add event listener to the Google Sign-in button
        googleSignInBtn.addEventListener('click', function() {
            // Authorize with Auth0 using Google connection
            auth0.authorize({
                connection: 'google'
            });
        });
    } else {
        console.error("Google Sign-in button not found");
    }

    // Function to handle authentication callback
    var handleAuthentication = function() {
        auth0.parseHash(function(err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                // Save tokens to local storage or session storage if needed
                window.location.href = authResult.redirectUri;
            } else if (err) {
                console.error('Authentication error:', err);
                window.location.href = 'https://skill-web3.vercel.app/index.html';
            }
        });
    };

    // Call the function to handle authentication when the page loads
    handleAuthentication();
}
