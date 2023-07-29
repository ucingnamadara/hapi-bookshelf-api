const bookController = require('../controller/book.controller');

// create new book
const router = [
    {
        method: 'POST',
        path: '/books',
        handler: bookController.post,
    },
    {
        method: 'GET',
        path: '/books',
        handler: bookController.list,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: bookController.getById,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: bookController.updateById,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: bookController.deleteById,
    },

];

module.exports = router;
