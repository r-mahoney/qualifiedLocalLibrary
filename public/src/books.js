function findAuthorById(authors = [], id = null) {
  return authors.find((author) => (author.id === id));
}

function findBookById(books = [], id = null) {
  return books.find(book => (book.id === id))
}

function partitionBooksByBorrowedStatus(books = []) {
  const returned = books.filter(book => {
    return book.borrows.every(borrowed => (borrowed.returned ))
  })
  const checkedOut = books.filter(book => {
    return book.borrows.some(borrowed => (!borrowed.returned))
  });

  return [checkedOut, returned];
}

function getBorrowersForBook({borrows = []} = {}, accounts = []) {
  let borrowedList = addNumberOfElementsToArray(borrows, 10);
  //we have an array of 10 elements with ids and returned values
  let borrowerAccounts = [];
  for (let ids of borrowedList) {
    let foundAccountObj = accounts.find(account=> (account.id === ids.id))
    borrowerAccounts.push({...foundAccountObj, returned: ids.returned})
  }
  return(borrowerAccounts)
}

function addNumberOfElementsToArray(userArray = [], numberOfelements = 0) { //userArray should be arrray off authors, books, or accounts
  let generatedArr = [];
  for (let i = 0; i < userArray.length; i++) {
    if (generatedArr.length < numberOfelements) {
      generatedArr.push(userArray[i])
    }
  }
  return generatedArr;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
