module.exports = (objectPagination, finds, req, countPageAll, countPage) => {
    const search = require('./search')
    // if (req.query.university) {
    //     finds.university = req.query.university
    // }

    // if (req.query.keyword)
    //     finds.name = search(req.query)

    // pagination (Phân trang)
    // let objectPagination = {
    //     limitItems: 4,
    //     currentPage: 1,
    //     skip: 0,
    // }
    objectPagination.totalPage = Math.ceil(countPageAll / objectPagination.limitItems)
    objectPagination.countPage = countPage
    if (req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page)
        objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems

    }
    return objectPagination
}