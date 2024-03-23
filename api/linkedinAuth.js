// linkedinAuth.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { code, state } = req.query;

    if (code) {
        try {
            const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `grant_type=authorization_code&code=${code}&client_id=${process.env.LINKEDIN_CLIENT_ID}&client_secret=${process.env.LINKEDIN_CLIENT_SECRET}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}`
            });

            if (!tokenResponse.ok) {
                throw new Error('Failed to obtain access token from LinkedIn');
            }

            const { access_token } = await tokenResponse.json();

            // Redirect the user back to your frontend with the access token
            res.redirect(302, `https://skill-web3.vercel.app/home.html?access_token=${access_token}&state=${state}`);
        } catch (error) {
            console.error('Error obtaining access token:', error);
            res.status(500).send('Failed to obtain access token from LinkedIn');
        }
    } else {
        // Redirect the user to LinkedIn's authorization page
        const scope = 'r_liteprofile%20r_emailaddress%20w_member_social';
        const redirect_uri = process.env.LINKEDIN_REDIRECT_URI;
        const client_id = process.env.LINKEDIN_CLIENT_ID;
        const state = 'RANDOM_STRING';
        const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`;

        res.redirect(302, url);
    }
};
