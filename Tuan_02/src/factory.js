class Dog {
    speak() {
        console.log("Gâu Gâu!");
    }
}

class Cat {
    speak() {
        console.log("Meo Meo!");
    }
}

class AnimalFactory{
    static createAnimal(type) {
        if(type === "dog") {
            return new Dog();
        }
         if(type === "cat") {
            return new Cat();
        }
    }
}

module.exports = { Dog, Cat, AnimalFactory };