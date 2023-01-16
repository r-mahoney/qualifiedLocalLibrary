function findAccountById(accounts, id) {
  return accounts.find((account) => (account.id === id));
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((account1, account2) => (account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1));
}

function getTotalNumberOfBorrows(account, books) {
  return books.flatMap(({ borrows }) => borrows.map(({ id }) => (id)))
    .reduce((total, id) => {
      return total + (id === account.id);
    }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  let borrowed = (books.filter(book => {
    return book.borrows.some((currentBook) => (currentBook.returned === false))
  }))
  let borrowedByAccount = borrowed.filter(book => {
    return book.borrows[0].id === account.id
  })

  

  let booksWithAuthor = []
  for (let borrowedBooks of borrowedByAccount) {
    let foundAuthor = authors.find(author => (author.id === borrowedBooks.authorId))
    borrowedBooks = { ...borrowedBooks, author: foundAuthor }
    booksWithAuthor.push(borrowedBooks);
  }
  return (booksWithAuthor);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

