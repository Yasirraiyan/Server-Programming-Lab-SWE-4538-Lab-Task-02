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
