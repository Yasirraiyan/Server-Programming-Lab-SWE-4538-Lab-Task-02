
import React, { useState } from 'react';

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

// Exporting components
export { FetchIPComponent, Auth };
export default Auth; // Only Auth is the default export
