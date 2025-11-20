import userQueries from '@/db/queries/users';
import { SignJWT, jwtVerify } from 'jose';

// Your secret key (store in environment variables)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-min-32-chars'
);

export const generateToken = async (userId: string) => {
  try {
    const token = await new SignJWT({ userId })
      .setProtectedHeader({ alg: 'HS256' }) // HMAC with SHA-256
      .setIssuedAt() // Sets "iat" (issued at) claim
      .setExpirationTime('24h') // Expires in 24 hours
      .setSubject(userId) // Sets "sub" (subject) claim
      .sign(JWT_SECRET);

    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate token');
  }
};

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ['HS256'] // Only accept HS256 algorithm
    });
    // 
    const user = await userQueries.getUserById(payload.userId as string);

    if (!user) {
      return {
        isValid: false,
        userId: null,
        issuedAt: null,
        expiresAt: null
      };
    }

    if(user.email_verified){
      throw new Error('User is already verified');
    }
    user.email_verified = true;
    await user.save();
    
    return {
      isValid: true,
      userId: payload.userId as string,
      issuedAt: payload.iat ? new Date(payload.iat * 1000) : null,
      expiresAt: payload.exp ? new Date(payload.exp * 1000) : null
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return {
      isValid: false,
      userId: null,
      issuedAt: null,
      expiresAt: null,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};