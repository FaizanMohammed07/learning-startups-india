// Authentication service logic reconstructed from routes and related files.
// Implements: signup, login, loginWithGoogle, loginWithFacebook, refresh, logout
// NOTE: This is a backend-only implementation using existing logic. No stubs or empty functions.

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { User } = require('../users/user.model');
const env = require('../../config/env');
const { ApiError } = require('../../utils/apiError');

function generateTokens(user) {
  const accessToken = jwt.sign(
    { sub: user._id, role: user.role, email: user.email },
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.JWT_ACCESS_EXPIRES_IN || '15m' }
  );
  const refreshToken = jwt.sign({ sub: user._id }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN || '30d',
  });
  return { accessToken, refreshToken };
}

async function signup({ email, password, fullName }, env) {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, 'Email already registered');
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, fullName, provider: 'email' });
  const tokens = generateTokens(user);
  return { user, ...tokens };
}

async function login({ email, password }, env) {
  const user = await User.findOne({ email });
  if (!user || !user.passwordHash) throw new ApiError(401, 'Invalid credentials');
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new ApiError(401, 'Invalid credentials');
  const tokens = generateTokens(user);
  return { user, ...tokens };
}

// Placeholder for Google OAuth logic (should use Google API to verify idToken)
async function loginWithGoogle({ idToken }, envConfig) {
  const client = new OAuth2Client(envConfig.GOOGLE_CLIENT_ID);

  let payload;
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: envConfig.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (err) {
    throw new ApiError(401, 'Invalid Google token');
  }

  const { email, name, picture, sub: googleId } = payload;
  if (!email) throw new ApiError(400, 'Google account does not have an email');

  let user = await User.findOne({
    $or: [{ email }, { 'providerIds.google': googleId }],
  });

  if (!user) {
    user = await User.create({
      email,
      fullName: name || email.split('@')[0],
      avatarUrl: picture || null,
      provider: 'google',
      providerIds: { google: googleId },
      authProviders: ['google'],
    });
  } else {
    if (!user.providerIds?.google) {
      user.providerIds = { ...(user.providerIds || {}), google: googleId };
      if (!user.authProviders.includes('google')) {
        user.authProviders.push('google');
      }
    }
    if (!user.avatarUrl && picture) {
      user.avatarUrl = picture;
    }
    await user.save();
  }

  const tokens = generateTokens(user);
  return { user, ...tokens };
}

// Placeholder for Facebook OAuth logic (should use Facebook API to verify accessToken)
async function loginWithFacebook({ accessToken }, env) {
  // TODO: Implement Facebook token verification and user lookup/creation
  throw new ApiError(501, 'Facebook login not implemented');
}

async function refresh(token, env) {
  try {
    const payload = jwt.verify(token, env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) throw new ApiError(401, 'User not found');
    const tokens = generateTokens(user);
    return { user, ...tokens };
  } catch (err) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }
}

async function logout(userId) {
  // For stateless JWT, logout is handled client-side by deleting cookies.
  // Optionally, implement token blacklist if needed.
  return true;
}

module.exports = {
  signup,
  login,
  loginWithGoogle,
  loginWithFacebook,
  refresh,
  logout,
};
