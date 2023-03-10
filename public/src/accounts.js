function findAccountById(accounts = [], id = "") {
  return accounts.find((account) => (account.id === id));
}

function sortAccountsByLastName(accounts = []) {
  return accounts.sort((account1, account2) => 
    (account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1));
}

function getTotalNumberOfBorrows(account = {}, books = []) {
  return books.flatMap(({ borrows }) => borrows.map(({ id }) => (id)))
    .reduce((total, id) => total + (id === account.id), 0);
}

function getBooksPossessedByAccount({id} = {}, books = [], authors = []) {
  // get array of all borrowed books
  let borrowed = (books.filter(book => book.borrows.some((currentBook) => (currentBook.returned === false))))
    .filter(book => book.borrows[0].id === id)

  let booksWithAuthor = []
// for each borrowed book by this account, find the author at the current book id and then push the book object with the found author value
  borrowed.forEach(book => {
    let foundAuthor = authors.find(author => (author.id === book.authorId))
    booksWithAuthor.push({...book, author: foundAuthor})
  });
  return ((booksWithAuthor));
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

