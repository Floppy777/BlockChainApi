module.exports = {
    // Default port
    port: 8080, 
    
    // Ethereum configuration
    ethereum: {
        // Default Ethereum account on Nodes
        // One callback only when confirmed, or Two callback when is not confirmed then confirmed
        callback_only_confirmed: false, // true, false
        // Total number of confirmations to get
        confirmations: 6,
        // Timeout of the transaction
        timeout: 60, // In minutes
        // Number of attempt to send a transaction if failed
        attempt: 3,
        // List of nodes
        nodes: [
            'http://localhost:8545'
        ],
        // Alert when account address is below the limit
        balance_limit: 2, // Ether
    }
}
