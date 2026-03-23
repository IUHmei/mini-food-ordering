class SearchStrategy {
    search(books, keyword) {
        throw new Error("Method not implemented");
    }
}

class SearchByTitle extends SearchStrategy {
    search(books, keyword) {
        return books.filter(book =>
            book.title.toLowerCase().includes(keyword.toLowerCase())
        );
    }
}

class SearchByAuthor extends SearchStrategy {
    search(books, keyword) {
        return books.filter(book =>
            book.author.toLowerCase().includes(keyword.toLowerCase())
        );
    }
}

class SearchByGenre extends SearchStrategy {
    search(books, keyword) {
        return books.filter(book =>
            book.genre.toLowerCase().includes(keyword.toLowerCase())
        );
    }
}

class SearchContext {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    execute(books, keyword) {
        return this.strategy.search(books, keyword);
    }
}

const books = [
    { title: "JavaScript", author: "John", genre: "Programming" },
    { title: "Clean Code", author: "Robert", genre: "Programming" },
    { title: "Doraemon", author: "Fujiko", genre: "Comic" }
];

const context = new SearchContext(new SearchByTitle());

console.log(context.execute(books, "java"));

context.setStrategy(new SearchByAuthor());
console.log(context.execute(books, "robert"));

context.setStrategy(new SearchByGenre());
console.log(context.execute(books, "comic"));