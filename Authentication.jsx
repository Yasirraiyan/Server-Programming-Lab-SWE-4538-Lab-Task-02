xfunction Auth() {
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
    }
    };
