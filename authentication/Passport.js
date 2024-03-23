//const contractABI = require('./config.json'); // Replace with your smart contract ABI
//const contractAddress = '0x53Ea848f8B5fe7162dE0f5A81861Ef9DDd902e45'; // Replace with your smart contract address
const oauth20 =  JSON.parse(document.getElementById('config').textContent); // Importing LinkedIn client ID and secret

// Configure Passport.js with LinkedIn OAuth strategy
passport.use(new LinkedInStrategy({
  clientID: oauth20.LINKEDIN_CLIENT_ID,
  clientSecret: oauth20.LINKEDIN_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile']
},
async function(_, __, profile, done) {
  // Extract user profile data (email, name, etc.) from LinkedIn profile
  const email = profile.emails[0].value;
  const name = profile.displayName;

  // Get the user's Ethereum address from MetaMask
  const userAddress = await connectWalletAndEnableLinkedIn();

  // Call smart contract function to record user data
  try {
      const result = await contract.methods.recordUserData(email, name).send({ from: userAddress });
      console.log('User data recorded on blockchain:', result);
      // Continue with authentication process or return user profile
      return done(null, profile);
  } catch (error) {
      console.error('Failed to record user data on blockchain:', error);
      return done(error);
  }
}));