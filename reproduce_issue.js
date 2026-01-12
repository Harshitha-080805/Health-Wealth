const axios = require('axios');
const { spawn } = require('child_process');
const path = require('path');

async function testAuth() {
    console.log('Starting server for testing...');
    const serverProcess = spawn('node', ['server.js'], {
        cwd: path.join(__dirname, 'server'),
        stdio: 'pipe',
        env: { ...process.env, PORT: '5001', DATABASE_URL: 'sqlite:./database_test.sqlite' } // Use different port and db to avoid conflicts
    });

    let serverOutput = '';
    serverProcess.stdout.on('data', (data) => {
        const str = data.toString();
        serverOutput += str;
        console.log('[SERVER]', str.trim());
    });
    serverProcess.stderr.on('data', (data) => {
        console.error('[SERVER ERROR]', data.toString().trim());
    });

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));

    try {
        const testEmail = 'test' + Date.now() + '@example.com';
        console.log('Attempting registration with:', testEmail);
        const regRes = await axios.post('http://localhost:5001/api/auth/register', {
            username: 'testuser_' + Date.now(),
            email: testEmail,
            password: 'password123'
        });
        console.log('Registration Success:', regRes.data);

        console.log('Attempting login...');
        const loginRes = await axios.post('http://localhost:5001/api/auth/login', {
            email: testEmail,
            password: 'password123'
        });
        console.log('Login Success:', loginRes.data);

    } catch (error) {
        console.error('Test Failed:', error.message);
        if (error.response) {
            console.error('Response Data:', error.response.data);
            console.error('Response Status:', error.response.status);
        }
    } finally {
        serverProcess.kill();
    }
}

testAuth();
