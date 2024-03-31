(function () {
    // Define a variable to hold the Auth0Client object
    let auth0;

    // Create a new script tag for the Auth0 library
    const auth0Script = document.createElement('script');
    auth0Script.src = 'https://cdn.auth0.com/js/auth0/9.19/auth0.min.js';
    document.head.appendChild(auth0Script);

    // Handle the Auth0 library script load event
    auth0Script.onload = function () {
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

        // Add event listener to the Google Sign In button
        var googleSignInBtn = document.getElementById('googleSignInBtn');
        googleSignInBtn.addEventListener('click', function () {
            // Trigger Auth0 authentication
            auth0.loginWithRedirect({
                connection: 'google'
            });
        });
    };

    // Handle error if the Auth0 library fails to load
    auth0Script.onerror = function (error) {
        console.error("Error loading the Auth0 library:", error);
    };
})();
