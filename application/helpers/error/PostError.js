class PostError extends Error {
    constructor(message, redirectURL, status) {
        super(message); // pass message to super
        this.redirectURL = redirectURL;
        this.status = status;
    }

    // don't need to change anything, so getters only
    getMessage() {
        return this.message;
    }

    getRedirectURL() {
        return this.redirectURL;
    }

    getStatus() {
        return this.status;
    }
}

// export so we can use elsewhere
module.exports = PostError;