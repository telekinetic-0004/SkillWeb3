export default async function handler(req, res) {
    const { code, state } = req.query;
  
    if (code) {
      try {
        const tokenResponse = await fetchAccessToken(code);
        const { access_token } = tokenResponse;
  
        // Redirect the user back to your frontend with the access token
        res.writeHead(302, { Location: `https://skill-web3.vercel.app/home.html?access_token=${access_token}&state=${state}` });
        res.end();
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('Server Error');
      }
    } else {
      // Redirect the user to LinkedIn's authorization page
      const scope = 'r_liteprofile%20r_emailaddress%20w_member_social';
      const redirectUri = process.env.LINKEDIN_REDIRECT_URI; // Replace with your actual redirect URI
      const clientId = process.env.LINKEDIN_CLIENT_ID; // Replace with your actual client ID
      const state = 'RANDOM_STRING'; // Generate a random state string
      const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
  
      res.writeHead(302, { Location: url });
      res.end();
    }
  }
  
  async function fetchAccessToken(code) {
    const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
    const body = `grant_type=authorization_code&code=${code}&client_id=${process.env.LINKEDIN_CLIENT_ID}&client_secret=${process.env.LINKEDIN_CLIENT_SECRET}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}`; // Replace with your client secret
  
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });
  
    return await response.json();
  }
  