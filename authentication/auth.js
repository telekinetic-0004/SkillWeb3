var auth0 = new Auth0Client({
    domain: 'dev-1lhu6wr3urnf83ul.us.auth0.com',
    client_id: 'jTYAK1RXiJkjjQPDClv2ymDfrcvJrUYv',
    redirect_uri: 'https://skill-web3.vercel.app/home.html',
    audience: 'https://dev-1lhu6wr3urnf83ul.us.auth0.com/api/v2/',
    scope: 'openid profile email'
});

var googleSignInBtn = document.getElementById('googleSignInBtn');

googleSignInBtn.addEventListener('click', function() {
    auth0.loginWithRedirect({
        connection: 'google'
    });
});

// Handle authentication
async function handleAuthentication() {
    const isAuthenticated = await auth0.isAuthenticated();
    if (isAuthenticated) {
        // Redirect to home page or perform necessary actions
        window.location.href = 'https://skill-web3.vercel.app/home.html';
    }
}

handleAuthentication();
