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

            const { access_token } = await tokenResponse.json();

            // Redirect the user back to your frontend with the access token
            res.writeHead(302, {
                Location: `https://skill-web3.vercel.app/index.html?access_token=${access_token}&state=${state}`
            });
            res.end();
        } catch (error) {
            res.status(500).send('Server Error');
        }
    } else {
        // Redirect the user to LinkedIn's authorization page
        const scope = 'r_liteprofile%20r_emailaddress%20w_member_social';
        const redirect_uri = process.env.LINKEDIN_REDIRECT_URI;
        const client_id = process.env.LINKEDIN_CLIENT_ID;
        const state = 'RANDOM_STRING';
        const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`;

        res.writeHead(302, { Location: url });
        res.end();
    }
};
