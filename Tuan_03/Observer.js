class Task {
    constructor(name) {
        this.name = name;
        this.status = "Pending";
        this.observers = [];
    }

    // Đăng ký nhận thông báo
    subscribe(observer) {
        this.observers.push(observer);
    }

    // Hủy đăng ký
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Thông báo cho tất cả
    notify() {
        this.observers.forEach(observer => {
            observer.update(this);
        });
    }

    // Thay đổi trạng thái
    setStatus(status) {
        this.status = status;
        console.log(`Task "${this.name}" changed to: ${status}`);
        this.notify();
    }
}

class User {
    constructor(name) {
        this.name = name;
    }

    update(task) {
        console.log(`${this.name} nhận thông báo: Task "${task.name}" -> ${task.status}`);
    }
}

const task = new Task("Làm API");

const user1 = new User("Hoàng");
const user2 = new User("An");

task.subscribe(user1);
task.subscribe(user2);

task.setStatus("In Progress");

task.unsubscribe(user2);

task.setStatus("Done");