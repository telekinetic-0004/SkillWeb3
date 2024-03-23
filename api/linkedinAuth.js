export default async function handler(req, res) {
    const { code, state } = req.query;

    try {
        if (code) {
            const accessTokenResponse = await fetch(
                `https://www.linkedin.com/oauth/v2/accessToken`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        grant_type: 'authorization_code',
                        code,
                        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
                        client_id: process.env.LINKEDIN_CLIENT_ID,
                        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
                    }),
                }
            );
            const accessTokenData = await accessTokenResponse.json();

            const userResponse = await fetch('https://api.linkedin.com/v2/me', {
                headers: {
                    Authorization: `Bearer ${accessTokenData.access_token}`,
                },
            });
            const userData = await userResponse.json();

            const stored = await storeUserDataOnBlockchain(userData.firstName, userData.email);

            if (stored) {
                res.redirect(process.env.FRONTEND_URL);
            } else {
                throw new Error('Failed to store user data');
            }
        } else {
            const scope = 'r_liteprofile r_emailaddress w_member_social';
            const redirectUri = process.env.LINKEDIN_REDIRECT_URI;
            const clientId = process.env.LINKEDIN_CLIENT_ID;

            const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

            res.status(200).json({ redirectUrl: url });
        }
    } catch (error) {
        console.error('Error in LinkedIn authentication:', error);
        res.status(500).json({ error: 'Failed to handle LinkedIn authentication' });
    }
}

async function storeUserDataOnBlockchain(firstName, email) {
    try {
        // Your blockchain storage logic here
        console.log('Stored user data:', { firstName, email });
        return true;
    } catch (error) {
        console.error('Error storing data on blockchain:', error);
        return false;
    }
}
