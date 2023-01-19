function getTotalBooksCount(books = []) {
  return books.length;
}

function getTotalAccountsCount(accounts = []) {
  return accounts.length;
}

function getBooksBorrowedCount(books = []) {
  const borrowedBooks = books.filter(book => {
    return book.borrows.some(status => (status.returned === false));
  })
  return borrowedBooks.length;
}

function getMostCommonGenres(books = []) {
  let genres = books.reduce((total, book) => {
    let currentGenre = book.genre;
    total[book.genre] = books.filter(book => (book.genre === currentGenre));
    return total;
  }, [])
  let keys = Object.keys(genres);

  let arrayOfGenres = [];
  for (let genre in keys) {
    arrayOfGenres.push({ name: keys[genre], count: genres[keys[genre]].length });
  }
  arrayOfGenres.sort((genreOne, genreTwo) => (genreTwo.count - genreOne.count));

  return addNumberOfElementsToArray(arrayOfGenres, 5)
}

function getMostPopularBooks(books = []) {
  //sorts books by number of times theyve been borrowed
  books.sort((bookA, bookB) => (bookA.borrows.length > bookB.borrows.length ? -1 : 1));
  //map array to generate array of [{ name: "incididunt nostrud minim", count: 30 }]
  let booksByTitleAndCount = books.map(({ title, borrows }) => ({ name: title, count: borrows.length }));
  //print an array of books thats capped at x
  //helper function to run through a for loop and push to an array until x has been reached
  //parameters should take (books, x) x is a user arg to prrint specific number of elements
  return addNumberOfElementsToArray(booksByTitleAndCount, 5);
}

function getMostPopularAuthors(books = [], authors = []) {
  let authorsArray = [];

  for (let book of books) {
    let foundId = authorsArray.find(idInArray => (idInArray.authorId === book.authorId));
    if (foundId) {
      foundId.count += book.borrows.length;
    } else {
      authorsArray.push({ authorId: book.authorId, count: book.borrows.length })
    }
  }

  authorsArray.sort((authorA, authorB) => {
    return authorA.count > authorB.count ? -1 : 1;
  })

  let fivePopAuthors = addNumberOfElementsToArray(authorsArray, 5);
  let popAuthorsWithName = [];
  for(let ids of fivePopAuthors) {
    let foundAuthor = authors.find(author => (author.id === ids.authorId))
    popAuthorsWithName.push({name: `${foundAuthor.name.first} ${foundAuthor.name.last}`, count: ids.count})
  }
  return(popAuthorsWithName);
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
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
