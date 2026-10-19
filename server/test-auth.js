// Quick sanity test for auth APIs
const test = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        password: 'password123',
      }),
    });
    const data = await res.json();
    console.log('Register Response:', data);

    // Test login
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'alex.johnson@example.com',
        password: 'password123',
      }),
    });
    const loginData = await loginRes.json();
    console.log('Login Response:', loginData);

    // Test protected me endpoint
    if (loginData.token) {
      const meRes = await fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${loginData.token}` },
      });
      const meData = await meRes.json();
      console.log('GetMe Response:', meData);
    }
  } catch (err) {
    console.error('Test error:', err);
  }
};

test();
