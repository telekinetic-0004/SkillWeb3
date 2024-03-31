(function () {
    // Define a variable to hold the Auth0WebAuth object
    let auth0WebAuth;

    // Create a new script tag for the Auth0 library
    const auth0Script = document.createElement('script');
    auth0Script.src = 'https://cdn.auth0.com/js/auth0/9.19/auth0.min.js';
    document.head.appendChild(auth0Script);

    // Handle the Auth0 library script load event
    auth0Script.onload = function () {
        console.log("Auth0 library loaded successfully");

        // Initialize Auth0WebAuth once the library is loaded
        auth0WebAuth = new auth0.WebAuth({
            domain: 'dev-1lhu6wr3urnf83ul.us.auth0.com',
            clientID: 'jTYAK1RXiJkjjQPDClv2ymDfrcvJrUYv',
            redirectUri: 'https://skill-web3.vercel.app/home.html',
            audience: 'https://dev-1lhu6wr3urnf83ul.us.auth0.com/api/v2/',
            responseType: 'token id_token',
            scope: 'openid profile email'
        });

        // Handle authentication
        function handleAuthentication() {
            console.log("Starting authentication handle");
            auth0WebAuth.parseHash(window.location.hash, function (err, result) {
                if (err) {
                    console.error("Error during authentication:", err);
                    return;
                }

                if (result && result.idToken) {
                    console.log("Authentication successful");
                    // Store the access token and id token in local storage
                    localStorage.setItem('access_token', result.accessToken);
                    localStorage.setItem('id_token', result.idToken);

                    // Redirect to home page or perform necessary actions
                    window.location.href = 'https://skill-web3.vercel.app/home.html';
                }
            });
        }

        handleAuthentication();

        // Add event listener to the Google Sign In button
        var googleSignInBtn = document.getElementById('googleSignInBtn');
        googleSignInBtn.addEventListener('click', function (event) {
            console.log("Google Sign-In button clicked");
            event.preventDefault(); // Prevent the default form submission behavior

            // Trigger Auth0 authentication
            auth0WebAuth.authorize({
                connection: 'google',
                responseType: 'token id_token',
                scope: 'openid profile email'
            });
        });
    };

    // Handle error if the Auth0 library fails to load
    auth0Script.onerror = function (error) {
        console.error("Error loading the Auth0 library:", error);
    };
})();