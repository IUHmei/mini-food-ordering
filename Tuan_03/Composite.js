class Component{
    render() {}
}

class UIComponent{
    constructor() {
        this.children = [];
    }
    add(component) {
        this.children.push(component);
    }
    remove(component) {
        this.children = this.children.filter(child => {
            child !== component
        });
    }
    render() {
        console.log("Render Componen: ");
        this.children.forEach(child => {
            child.render();
        });
    }
}

class Button{
    render(){
        console.log("- Render button!");
    }
}

class Dialog{
    render(){
        console.log("- Render dialog!");
    }
}

class NavigationBar{
    render(){
        console.log("- Render NavigationBar!");
    }
}

const ui = new UIComponent();
const button = new Button();
const dialog = new Dialog();
const navBar = new NavigationBar();

ui.add(button);
ui.add(dialog);
ui.add(navBar);
ui.render();