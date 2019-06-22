import uuidv4 from 'uuid/v4';

const Mutation = {
    createUser(parent, args, { db }, info) {
        const phoneNumberTaken = db.users.some((user) => {
            return user.phoneNumber === args.data.phoneNumber;
        });

        if(phoneNumberTaken) {
            throw new Error("Phone Number already in use.")
        }
        const user = {
            id: uuidv4(),
            ...args.data
        };
        db.users.push(user);
        return user;
    },
    updateUser(parent, args, { db }, info) {
        const user = db.users.find((user) => {
            return user.id === args.id;
        });
        if (!user) {
            throw new Error("User not found.");
        }
        if (typeof args.data.phoneNumber === 'string') {
            const phoneNumberTaken = db.users.some((user) => {
                return user.phoneNumber === args.data.phoneNumber;
            });
            if (phoneNumberTaken) {
                throw new Error('Phone number already taken');
            }
            user.phoneNumber = args.data.phoneNumber;
        }
        if (typeof args.data.name === "string") {
            user.name = args.data.name;
        }
        return user;
    },
    deleteUser(parent, args, { db }, info) {
        const userIndex = db.users.findIndex((user) => {
            return user.id === args.id;
        });

        if (userIndex === -1) {
            throw new Error('User not found.');
        }
        const deletedUsers = db.users.splice(userIndex, 1);
        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id;
            if (match) {
                db.comments = db.comments.filter((comment) => {
                    return comment.post !== post.id;
                })
            }
            return !match;
        });
        return deletedUsers[0];
    },
    createPost(parent, args, { db }, info) {
        const userExists = db.users.some((user) => {
            return user.id === args.data.author;
        });

        if(!userExists) {
            throw new Error("User not found.")
        }

        const post = {
            id: uuidv4(),
            ...args.data
        };
        db.posts.push(post);
        return post;
    },
    updatePost(parent, args, { db }, info) {
        const post = db.posts.find((post) => {
            return post.id === args.id;
        });
        if (!post) {
            throw new Error('Post not found.');
        }
        if (typeof args.data.title === "string") {
            post.title = args.data.title;
        }
        if (typeof args.data.description === "string") {
            post.description = args.data.description;
        }
        if (typeof args.data.portions === "number")  {
            post.portions = args.data.portions;
        }

        return post;
    },
    deletePost(parent, args, { db }, info) {
        const postIndex = db.posts.findIndex((post) => {
            return post.id === args.id;
        });
        if (postIndex === -1) {
            throw new Error("Post not found.")
        }
        const deletedPosts = db.posts.splice(postIndex, 1);
        db.posts = db.posts.filter((post) => {
            return post.id !== args.id;
        });
        return deletedPosts[0];
    }
};

export { Mutation as default };