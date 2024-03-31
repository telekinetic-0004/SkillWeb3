const auth0 = new auth0.WebAuth({
    domain: 'YOUR_AUTH0_DOMAIN', // Replace with your Auth0 domain
    clientID: 'YOUR_AUTH0_CLIENT_ID', // Replace with your Auth0 client ID
    redirectUri: 'https://skill_web3.vercel.app/callback' // Update with your Vercel deployment URL
  });
  
  function loginWithGoogle() {
    auth0.authorize({
      connection: 'google-oauth2',
      scope: 'openid profile email'
    });
  }
  
  window.addEventListener('hashchange', handleRedirect); // Handle redirect after login
  
  function handleRedirect() {
    const code = window.location.hash.substr(1);
    auth0.parseHash(code, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        getUserInfo(authResult);
      } else {
        console.log(err);
      }
    });
  }
  
  function getUserInfo(authResult) {
    const accessToken = authResult.accessToken;
    fetch('https://YOUR_AUTH0_DOMAIN/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(userInfo => {
      const userDisplay = `
        <p>Name: ${userInfo.name}</p>
        <p>Email: ${userInfo.email}</p>
      `;
      document.getElementById('user-info').innerHTML = userDisplay;
    })
    .catch(error => console.error(error));
  }
  
  function signOut() {
    auth0.logout({
      returnTo: 'https://skill_web3.vercel.app' // Redirect back to your app after sign-out
    });
  }
  