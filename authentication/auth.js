var auth0 = new auth0.WebAuth({
    domain: env.AUTH0_DOMAIN,
    clientID: env.AUTH0_CLIENT_ID,
    redirectUri: env.FRONTEND_URL,
    retry: env.RETRY_URL,
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
            window.location.href = env.FRONTEND_URL;
        } else if (err) {
            console.error('Authentication error:', err);
            window.location.href = env.RETRY_URL;
        }
    });
};

// Call the function to handle authentication when the page loads
handleAuthentication();
