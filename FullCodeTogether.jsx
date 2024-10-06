import React, { useState } from 'react';

// Fetch IP Component
function FetchIPComponent() {
    const [url, setUrl] = useState(''); 
    const [ipAddress, setIpAddress] = useState(''); 
    const [error, setError] = useState('');

    const handleFetchIP = async () => {
        if (url === '') {
            setError('Please enter a valid URL');
            return;
        }

        try {
            const response = await fetch(`https://dns.google/resolve?name=${url}`);
            const data = await response.json();

            if (response.ok && data.Answer) {
                const ipAnswer = data.Answer.find(answer => answer.type === 1);
                if (ipAnswer) {
                    setIpAddress(ipAnswer.data);
                    setError('');
                } else {
                    setError('No IP address found for the provided URL');
                }
            } else {
                setError('Could not fetch the IP address');
            }
        } catch (error) {
            setError('Error fetching IP address');
        }
    };

    return (
        <div className="FetchIP" style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Search Webpage and Get IP Address</h1>
            <div style={{ marginBottom: '20px' }}>
                <label>Website URL: </label>
                <input
                    type="text"
                    placeholder="Enter website URL (e.g. google.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <br />
                <button onClick={handleFetchIP}>Get IP Address</button>
            </div>
            {ipAddress && <p>IP Address: {ipAddress}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

// Auth Component
function Auth() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedAnime, setSelectedAnime] = useState('');
    const [registeredUsers, setRegisteredUsers] = useState([
        { username: 'user1', password: 'Password1!', anime: 'Spirited Away' },
        { username: 'user2', password: 'Password2!', anime: 'The House of Small Cubes' },
        { username: 'user3', password: 'Password3!', anime: 'Spirited Away' }
    ]);
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState('');
    const [loggedInUsers, setLoggedInUsers] = useState([]);
    const [newAnime, setNewAnime] = useState('');
    const [editUser, setEditUser] = useState(null);

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleRegister = () => {
        if (username === '' || password === '' || confirmPassword === '' || selectedAnime === '') {
            setError('Please fill out all fields');
            return;
        }

        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long, include 1 uppercase letter, 1 number, and 1 symbol');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const isAlreadyRegistered = registeredUsers.some(user => user.username === username);
        if (isAlreadyRegistered) {
            setError('Username is already registered. Please log in.');
            return;
        }

        setRegisteredUsers([...registeredUsers, { username, password, anime: selectedAnime }]);
        setError('');
        alert(`Registration successful for ${username}!`);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setSelectedAnime('');
    };

    const handleLogin = () => {
        if (loginUsername === '' || loginPassword === '') {
            setError('Please input username and password first');
            return;
        }

        const isValidUser = registeredUsers.some(
            (user) => user.username === loginUsername && user.password === loginPassword
        );

        if (isValidUser) {
            setError('');
            setIsLoggedIn(true);
            setLoggedInUser(loginUsername);

            if (!loggedInUsers.includes(loginUsername)) {
                setLoggedInUsers([...loggedInUsers, loginUsername]);
            }

            alert(`Login successful! Welcome ${loginUsername}`);
        } else {
            setError('Invalid username or password');
        }
    };

    const handleEditUser = (username) => {
        const userToEdit = registeredUsers.find(user => user.username === username);
        setEditUser(userToEdit);
        setNewAnime(userToEdit.anime);
    };

    const handleSaveEdit = () => {
        const updatedUsers = registeredUsers.map(user => {
            if (user.username === editUser.username) {
                return { ...user, anime: newAnime };
            }
            return user;
        });

        setRegisteredUsers(updatedUsers);
        setEditUser(null);
        setNewAnime('');
    };

    const handleDeleteUser = (username) => {
        const updatedUsers = registeredUsers.filter(user => user.username !== username);
        setRegisteredUsers(updatedUsers);
        setLoggedInUsers(updatedUsers.map(user => user.username));
    };

    return (
        <div className="Auth" style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>{isLoggedIn ? `Welcome ${loggedInUser}!` : 'Register or Log In'}</h1>

            {!isLoggedIn ? (
                <>
                    <div style={{ marginBottom: '20px' }}>
                        <h2>Sign Up</h2>
                        <label>Username:</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br />
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <br />
                        <label>Favorite Anime:</label>
                        <select
                            id="anime"
                            name="anime"
                            value={selectedAnime}
                            onChange={(e) => setSelectedAnime(e.target.value)}
                        >
                            <option value="Spirited Away">Spirited Away</option>
                            <option value="The House of Small Cubes">The House of Small Cubes</option>
                        </select>
                        <br />
                        <button onClick={handleRegister}>Register</button>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h2>Log In</h2>
                        <label>Username:</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                        />
                        <br />
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <br />
                        <button onClick={handleLogin}>Log In</button>
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </>
            ) : (
                <>
                    <p>Welcome to the app, {loggedInUser}! You are now logged in.</p>
                    <button onClick={() => setIsLoggedIn(false)}>Log Out</button>

                    <div style={{ marginTop: '20px' }}>
                        <h2>Home</h2>
                        <p>List of Logged-in Users</p>
                        <ul>
                            {loggedInUsers.map(user => (
                                <li key={user}>
                                    {user}
                                    <button onClick={() => handleEditUser(user)}>Edit</button>
                                    <br />
                                    <button onClick={() => handleDeleteUser(user)}>Delete</button>
                                </li>
                            ))}
                        </ul>

                        <h3>Add/Edit Anime</h3>
                        {editUser ? (
                            <>
                                <input
                                    type="text"
                                    placeholder="Edit anime"
                                    value={newAnime}
                                    onChange={(e) => setNewAnime(e.target.value)}
                                />
                                <button onClick={handleSaveEdit}>Save</button>
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    placeholder="Add new anime"
                                    value={newAnime}
                                    onChange={(e) => setNewAnime(e.target.value)}
                                />
                                <button onClick={handleSaveEdit}>Add</button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

// Exporting components
export { FetchIPComponent, Auth };
export default Auth; // Only Auth is the default export
