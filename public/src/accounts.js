function findAccountById(accounts = [], id = "") {
  return accounts.find((account) => (account.id === id));
}

function sortAccountsByLastName(accounts = []) {
  return accounts.sort((account1, account2) => (account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1));
}

function getTotalNumberOfBorrows(account = {}, books = []) {
  return books.flatMap(({ borrows }) => borrows.map(({ id }) => (id)))
    .reduce((total, id) => {
      return total + (id === account.id);
    }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  // get array of all borrowed books
  let borrowed = (books.filter(book => {
    return book.borrows.some((currentBook) => (currentBook.returned === false))
  }))
// get array of books where given account id === borrowed book id at not returned index,  in this case postion 0
  let borrowedByAccount = borrowed.filter(book => {
    return book.borrows[0].id === account.id
  })

  let booksWithAuthor = []
// for each borrowed book by this account, find the author at the current book id and then push the book object with the found author value
  borrowedByAccount.forEach(book => {
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

