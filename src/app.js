import { GraphQLServer, PubSub } from "graphql-yoga";
import db from './db';

const pubSub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {

    },
    context: {
        db,
        pubSub
    }
});

server.start({port: 3000}, () => {
    console.log("Listening on port 3000");
});
