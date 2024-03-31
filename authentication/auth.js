// Define a global variable to hold the Auth0Client object
var auth0;

document.addEventListener('DOMContentLoaded', function() {
    // Load Auth0 library asynchronously
    var auth0Script = document.createElement('script');
    auth0Script.src = 'https://cdn.auth0.com/js/auth0/9.19/auth0.min.js';
    document.head.appendChild(auth0Script);

    // Listen for the script load event
    auth0Script.addEventListener('load', function() {
        // Initialize Auth0Client once the library is loaded
        auth0 = new Auth0Client({
            domain: 'dev-1lhu6wr3urnf83ul.us.auth0.com',
            client_id: 'jTYAK1RXiJkjjQPDClv2ymDfrcvJrUYv',
            redirect_uri: 'https://skill-web3.vercel.app/home.html',
            audience: 'https://dev-1lhu6wr3urnf83ul.us.auth0.com/api/v2/',
            scope: 'openid profile email'
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

        var googleSignInBtn = document.getElementById('googleSignInBtn');

        googleSignInBtn.addEventListener('click', function() {
            // Trigger Auth0 authentication
            auth0.loginWithRedirect({
                connection: 'google'
            });
        });
    });
});
