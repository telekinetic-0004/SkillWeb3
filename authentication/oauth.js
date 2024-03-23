const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const auth=require("./config.json");
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Replace these with your actual client ID and client secret
const CLIENT_ID = auth.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = auth.LINKEDIN_CLIENT_SECRET;

// Redirect URI after LinkedIn authentication
const REDIRECT_URI = 'http://localhost:3000/auth/linkedin/callback';

// LinkedIn API URLs
const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization';
const LINKEDIN_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken';
const LINKEDIN_PROFILE_URL = 'https://api.linkedin.com/v2/me';

// Redirect to LinkedIn authorization URL
app.get('/auth/linkedin', passport.authenticate('linkedin',{state:'SOME STATE'}),function (_, res) {
    const authUrl = `${LINKEDIN_AUTH_URL}?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=random_state&scope=r_liteprofile%20r_emailaddress`;
    res.redirect(authUrl);
});

// Handle LinkedIn callback
app.get('/auth/linkedin/callback', async (req, res) => {
    const code = req.query.code;

    // Exchange authorization code for access token
    const tokenResponse = await fetch(LINKEDIN_TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Use access token to fetch user profile from LinkedIn
    const profileResponse = await fetch(LINKEDIN_PROFILE_URL, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    const profileData = await profileResponse.json();

    // You can now use the profileData to extract user information and store it in your database
    console.log('User Profile:', profileData);

    // Redirect user to landing page or perform any other actions
    res.redirect('/landing');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
