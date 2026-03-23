class Library {
    constructor() {
        if (Library.instance) {
            return Library.instance;
        }

        this.books = [];
        Library.instance = this;
    }

    addBook(book) {
        this.books.push(book);
    }

    getBooks() {
        return this.books;
    }
}

const lib1 = new Library();
const lib2 = new Library();

lib1.addBook("JavaScript");

console.log(lib2.getBooks());

console.log(lib1 === lib2); 