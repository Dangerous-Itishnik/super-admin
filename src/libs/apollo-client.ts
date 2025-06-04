import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
    uri: 'https://inctagram.work/api/v1/graphql',
    credentials: 'include',
});

// ✅ Auth-Link
const authLink = setContext((_, { headers }) => {
    const Auth = btoa('admin@gmail.com:admin');

    return {
        headers: {
            ...headers,
            Authorization: `Basic ${Auth}`,
            'Content-Type': 'application/json',
        },
    };
});

// ✅ Apollo Client
export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
        },
    },
});
