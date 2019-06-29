const Post = {
    author (parent, args, { db }, info) {
        return db.users.find((user) => {
           return user.id === parent.author;
        });
    },
    reservedBy (parent, args, { db }, info) {
        return db.users.find((user) => {
            return user.id === parent.reservedBy;
        });
    }
};

export { Post as default };
