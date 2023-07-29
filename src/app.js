const hapi = require('@hapi/hapi');
const bookRoute = require('./route/book.route');

const init = async () => {
    const server = hapi.server({
        port : 9000,
        host : 'localhost',
    });

    server.route(bookRoute);

    await server.start();
};

init();