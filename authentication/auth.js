var auth0 = new auth0.WebAuth({
    domain: 'dev-1lhu6wr3urnf83ul.us.auth0.com',
    clientID: 'jTYAK1RXiJkjjQPDClv2ymDfrcvJrUYv',
    redirectUri: 'https://skill-web3.vercel.app/home.html',
    responseType: 'token id_token',
    scope: 'openid profile email'
});

var googleSignInBtn = document.getElementById('googleSignInBtn');

googleSignInBtn.addEventListener('click', function() {
    auth0.authorize({
        connection: 'google'
    });
});

// Check if there are tokens in the URL hash indicating a successful authentication
var handleAuthentication = function() {
    auth0.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
            // Save tokens to local storage or session storage if needed
            window.location.href = redirectUri;
        } else if (err) {
            console.error('Authentication error:', err);
            window.location.href = 'https://skill-web3.vercel.app/index.html';
        }
    });
};

// Call the function to handle authentication when the page loads
handleAuthentication();
