const Query = {
    users(parent, args, { db }, info) {
        if (!args.query) {
            return db.users;
        }
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase());
        });
    },
    posts(parent, args, { db }, info) {
        if(!args.query) {
            return db.posts;
        }
        return db.posts.filter( (post) => {
            return post.description.toLowerCase().includes(args.query.toLowerCase())
        });
    }
};

export { Query as default };
