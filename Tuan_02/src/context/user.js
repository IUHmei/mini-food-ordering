class User {
    setState(state) {
        this.state = state;
    }

    showStatus() {
        this.state.status();
    }
}

module.exports = User;