const Subscription = {
    post: {
        subscribe(parent, args, { pubSub }, info) {
            return pubSub.asyncIterator('post')
        }
    }
};

export { Subscription as default };


