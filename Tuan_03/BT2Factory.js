class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    getInfo() {
        return `${this.title} - ${this.author}`;
    }
}

class PaperBook extends Book {
    constructor(title, author) {
        super(title, author);
        this.type = "Paper Book";
    }
}

class EBook extends Book {
    constructor(title, author) {
        super(title, author);
        this.type = "E-Book";
    }
}

class AudioBook extends Book {
    constructor(title, author) {
        super(title, author);
        this.type = "Audio Book";
    }
}

class BookFactory {
    static createBook(type, title, author) {
        switch (type) {
            case "paper":
                return new PaperBook(title, author);
            case "ebook":
                return new EBook(title, author);
            case "audio":
                return new AudioBook(title, author);
            default:
                throw new Error("Loại sách không hợp lệ");
        }
    }
}

const book1 = BookFactory.createBook("paper", "Doraemon", "Fujiko");
const book2 = BookFactory.createBook("ebook", "JavaScript", "John");
const book3 = BookFactory.createBook("audio", "Clean Code", "Robert");

console.log(book1);
console.log(book2);
console.log(book3);