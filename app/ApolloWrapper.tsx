"use client";

import { HttpLink } from "@apollo/client";
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

function makeClient() {
    const httpLink = new HttpLink({
        uri: "https://api-test.beeonco.de/graphql",
        fetchOptions: { cache: "no-store" },
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
