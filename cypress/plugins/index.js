let globalStore = {}; // Object to store values between tests

module.exports = on => {
    on('task', {
        setData({ key, value }) {
            globalStore[key] = value;
            return null;
        },
        getData(key) {
            return globalStore[key] || null;
        },
        clearData() {
            globalStore = {};
            return null;
        }
    });
};
