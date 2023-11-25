class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.available = true;
    }

    checkAvailability() {
        return this.available;
    }

    borrowBook() {
        if (this.available) {
            this.available = false;
            return true; // Book successfully borrowed
        } else {
            return false; // Book is not available
        }
    }

    returnBook() {
        this.available = true;
    }
}

class LibraryMember {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.borrowedBooks = [];
    }

    borrowBook(book) {
        if (book.borrowBook()) {
            this.borrowedBooks.push(book);
            return true; // Book successfully borrowed
        } else {
            return false; // Book is not available
        }
    }

    returnBook(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            this.borrowedBooks.splice(index, 1);
            book.returnBook();
            return true; // Book successfully returned
        } else {
            return false; // Member did not borrow this book
        }
    }

    displayBorrowedBooks() {
        return this.borrowedBooks.map(book => `${book.title} by ${book.author}`);
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    checkBookAvailability(title) {
        const book = this.books.find(book => book.title === title);
        return book ? book.checkAvailability() : false;
    }
}

class LibraryStaff {
    addBook(library, title, author) {
        const newBook = new Book(title, author);
        library.books.push(newBook);
    }

    removeDamagedBook(library, book) {
        const index = library.books.indexOf(book);
        if (index !== -1) {
            library.books.splice(index, 1);
            return true; // Book successfully removed
        } else {
            return false; // Book not found in the library
        }
    }
}



// Example Usage:
const library = new Library();
const staff = new LibraryStaff();
const member = new LibraryMember("John Doe", "john@example.com");

staff.addBook(library, "The Great Gatsby", "F. Scott Fitzgerald");
staff.addBook(library, "To Kill a Mockingbird", "Harper Lee");

console.log(library.checkBookAvailability("The Great Gatsby")); // true

member.borrowBook(library.books[0]);
console.log(library.checkBookAvailability("The Great Gatsby")); // false
console.log(member.displayBorrowedBooks()); // ["The Great Gatsby by F. Scott Fitzgerald"]

member.returnBook(library.books[0]);
console.log(library.checkBookAvailability("The Great Gatsby")); // true
console.log(member.displayBorrowedBooks()); // []

staff.removeDamagedBook(library, library.books[1]);
console.log(library.books); // The Great Gatsby book remains in the library