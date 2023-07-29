/* eslint-disable eqeqeq */
const { nanoid } = require('nanoid');
const books = require('../model/book');

const post = (req, h) => {
  // extract json body from request
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.payload;

  // generate id
  const id = nanoid(16);
  // get current date
  const insertedAt = new Date().toISOString();
  // set updated at
  const updatedAt = insertedAt;
  // set finished flag by condition
  const finished = pageCount === readPage;

  // name is required
  if (name === null || name === undefined) {
    // return bad reqyest and json
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  } else if (readPage > pageCount) {
    // return bad reqyest and json
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  } else {
    // create new object
    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    // persist to database
    books.push(newBook);

    // return response CREATED and return json
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
  }
};

const list = (req, h) => {
  const { name, finished, reading } = req.query;

  const data = [];

  let temp = books.slice(0);

  if (name !== undefined) {
    temp = temp.filter((s) => s.name.toLowerCase().match(name.toLowerCase()));
  }

  if (finished !== undefined) {
    temp = temp.filter((s) => s.finished == finished);
  }

  if (reading !== undefined) {
    temp = temp.filter((s) => s.reading == reading);
  }

  temp.forEach((book) => {
    const { id, name: bookName, publisher } = book;
    data.push({ id, name: bookName, publisher });
  });

  return h.response({
    status: 'success',
    data: {
      books: data,
    },
  }).code(200);
};

const getById = (req, h) => {
  // get book id from path parameter
  const { bookId } = req.params;

  const book = books.filter((s) => s.id === bookId)[0];

  // return NOT FOUND if book is null
  if (book === null || book === undefined) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  } else {
    return h.response({
      status: 'success',
      data: {
        book,
      },
    }).code(200);
  }
};

const updateById = (req, h) => {
  const { bookId } = req.params;
  // extract json body from request
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.payload;

  const index = books.findIndex((s) => s.id === bookId);

  // set updated at
  const updatedAt = new Date().toISOString();
  // set finished flag by condition
  const finished = pageCount === readPage;

  // return NOT FOUND if book is null
  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  } else if (name === null || name === undefined) {
    // return bad reqyest and json
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  } else if (readPage > pageCount) {
    // return bad reqyest and json
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  } else {
    // update to database
    books[index] = {
      id: bookId,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt: books[index].insertedAt,
      updatedAt,
    };

    // return response OK and return json
    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }
};

const deleteById = (req, h) => {
  const { bookId } = req.params;

  const index = books.findIndex((s) => s.id === bookId);

  // return NOT FOUND if book is null
  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  } else {
    // delete to database
    books.splice(index, 1);
    // return response OK and return json
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  }
};

module.exports = {
  post, list, getById, updateById, deleteById,
};
