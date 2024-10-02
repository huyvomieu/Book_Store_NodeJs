module.exports = (query) => {
    if (query.keyword) {
        var regx = new RegExp(query.keyword, 'i')
    }
    return regx
}