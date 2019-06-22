import { GraphQLServer, PubSub } from "graphql-yoga";

import Mutation from './resolvers/Mutation';
import Query from './resolvers/Query';
import Subscription from './resolvers/Subscription';

import User from './resolvers/User';
import Post from './resolvers/Post';
import db from './db';

const pubSub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post
    },
    context: {
        db,
        pubSub
    }
});

server.start({port: 3000}, () => {
    console.log("Listening on port 3000");
});
