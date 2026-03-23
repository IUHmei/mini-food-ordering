class singleton {
    constructor() {
        if(singleton.instance) {
            return singleton.instance;
        }
        console.log("Singleton đã được tạo!");
        singleton.instance = this;
    }
}

module.exports = singleton;