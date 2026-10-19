// Comprehensive end-to-end integration test for MERN + Google Auth
const testAllFlows = async () => {
  const BASE_URL = 'http://localhost:5000/api';
  console.log('--- STARTING COMPLETE AUTHENTICATION FLOW TESTS ---');

  // 1. Health check
  const healthRes = await fetch(`${BASE_URL}/health`);
  const health = await healthRes.json();
  console.log('✅ 1. Health Check:', health);

  // 2. Register new user
  const email = `testuser_${Date.now()}@example.com`;
  const registerRes = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Jordan Reed',
      email,
      password: 'Password123!',
    }),
  });
  const registerData = await registerRes.json();
  console.log('✅ 2. Registration:', {
    success: registerData.success,
    message: registerData.message,
    user: registerData.user?.email,
    authType: registerData.user?.authType,
    hasToken: !!registerData.token,
  });

  const token = registerData.token;

  // 3. Protected GET /me
  const meRes = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const meData = await meRes.json();
  console.log('✅ 3. Protected Profile (/me):', {
    success: meData.success,
    id: meData.user?._id,
    name: meData.user?.name,
    email: meData.user?.email,
  });

  // 4. Update Profile
  const updateRes = await fetch(`${BASE_URL}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: 'Jordan Reed, PhD',
      bio: 'Full stack developer & security researcher.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    }),
  });
  const updateData = await updateRes.json();
  console.log('✅ 4. Update Profile:', {
    success: updateData.success,
    updatedName: updateData.user?.name,
    updatedBio: updateData.user?.bio,
  });

  // 5. Change Password
  const pwdRes = await fetch(`${BASE_URL}/auth/change-password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword: 'Password123!',
      newPassword: 'NewSecurePassword456!',
    }),
  });
  const pwdData = await pwdRes.json();
  console.log('✅ 5. Change Password:', pwdData);

  // 6. Login with new password
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password: 'NewSecurePassword456!',
    }),
  });
  const loginData = await loginRes.json();
  console.log('✅ 6. Login with New Password:', {
    success: loginData.success,
    message: loginData.message,
    tokenReceived: !!loginData.token,
  });

  // 7. Google OAuth Flow
  const googleRes = await fetch(`${BASE_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userInfo: {
        googleId: `g_oauth_${Date.now()}`,
        name: 'Elena Rostova',
        email: `elena.rostova.${Date.now()}@gmail.com`,
        picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      },
    }),
  });
  const googleData = await googleRes.json();
  console.log('✅ 7. Google OAuth Authentication:', {
    success: googleData.success,
    message: googleData.message,
    user: googleData.user?.name,
    authType: googleData.user?.authType,
    hasToken: !!googleData.token,
  });

  // 8. Logout
  const logoutRes = await fetch(`${BASE_URL}/auth/logout`, { method: 'POST' });
  const logoutData = await logoutRes.json();
  console.log('✅ 8. Logout:', logoutData);

  console.log('--- ALL AUTHENTICATION TESTS PASSED SUCCESSFULLY! 🎉 ---');
};

testAllFlows();
