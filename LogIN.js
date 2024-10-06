const [loginUsername, setLoginUsername] = useState('');
const [loginPassword, setLoginPassword] = useState('');
const [error, setError] = useState('');
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
