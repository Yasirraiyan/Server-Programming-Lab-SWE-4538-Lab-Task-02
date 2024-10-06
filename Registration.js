function Auth() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedAnime, setSelectedAnime] = useState('');
}
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
