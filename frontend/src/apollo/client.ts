import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error'; // Import ErrorLink
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import config from "../config";

// Create an async function to get the fingerprint ID
const getFingerprint = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
};

// Create authLink to set headers for each request
const authLink = setContext(async (_, { headers }) => {
    const fingerprint = await getFingerprint();  // Generate fingerprint

    return {
        headers: {
            ...headers,
            'X-Fingerprint-ID': fingerprint,  // Add fingerprint to headers
        },
    };
});

// Create an error link to handle GraphQL errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => {
            console.error(`[GraphQL error]: Message: ${message}`);
        });
    }
    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});

// Define HTTP link with your GraphQL URI
const httpLink = new HttpLink({
    uri: config.GRAPHQL_URL,
    credentials: 'include',
});

// Initialize Apollo Client
const client = new ApolloClient({
    link: authLink.concat(errorLink).concat(httpLink), // Combine links
    cache: new InMemoryCache(),
});

export default client;
