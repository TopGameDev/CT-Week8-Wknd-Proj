import { v4 as uuidv4 } from "uuid";


class Item{
    
    constructor(
        private _name: string,
        private _price: number,
        private _description: string,
        private _id: string = uuidv4(),
        ){}

        public get description(): string {
            return this._description;
        }
        public set description(value: string) {
            this._description = value;
        }
        public get price(): number {
            return this._price;
        }
        public set price(value: number) {
            this._price = value;
        }
        public get name(): string {
            return this._name;
        }
        public set name(value: string) {
            this._name = value;
        }
        public get id(): string {
            return this._id;
        }
        public set id(value: string) {
            this._id = value;
        }

        public itemElement(){
            const itemContainer = document.createElement("div")
            itemContainer.innerHTML = `<div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <p class="card-text">${this.price}</p>
            <p class="card-text">${this.description}</p>
            <a href="#" class="btn btn-success" id="add">Add To Cart<a/>
            </div>
            </div>
            `

            const addToCart = itemContainer.querySelector("#add") as HTMLLinkElement;
            addToCart.addEventListener("click", () => {
                Shop.myUser!.addToCart(this)
            })
            return itemContainer
        }

}

class User{

    constructor(
        private _name: string,
        private _age: number,
        private _id: string = uuidv4(),
        private _cart: Item[] = [],
    ){}

    public get cart(): Item[] {
        return this._cart;
    }
    public set cart(value: Item[]) {
        this._cart = value;
    }
    public get age(): number {
        return this._age;
    }
    public set age(value: number) {
        this._age = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    static loggingInUser(){
        const name = (<HTMLInputElement>document.getElementById("name")).value;
        const age = parseInt((<HTMLInputElement>document.getElementById("age")).value);

        if (name && age > 0){
            const turnOn = document.getElementsByClassName('is-invisible')
            for (const element of turnOn){
                console.log("Turning on", element);
                element.classList.replace('is-invisible', 'is-visible');

            }
            return new User(name, age)
        }
        return
    }

    public cartHTMLElement():HTMLDivElement{
        const element = document.createElement('div');
        element.classList.add("cart-section")
        for (const cartItem of new Set(this.cart)){
            const removeOne = document.createElement("button")
            removeOne.classList.add("btn", "btn-warning")
            removeOne.id = `${cartItem.id}-removeOne`
            removeOne.innerText = "-"
            removeOne.addEventListener("click", () => {
                this.removeQuantity(cartItem, 1)
            })

            const removeAll = document.createElement("button")
            removeAll.classList.add("btn", "btn-danger")
            removeAll.id = `${cartItem.id}-removeAll`
            removeAll.innerText = "X"
            removeAll.addEventListener("click", () => {
                this.removeFromCart(cartItem)
            })
            element.innerHTML += `<div class="cart-info"><p><strong>${cartItem.name}</strong></p>
            <p>${cartItem.price}</p>
            <p>x${this.cart.filter(item => item === cartItem).length}</p>
            <p>${removeOne.outerHTML}</p>
            <p>${removeAll.outerHTML}</p>
            </div>
            `
        }
        element.innerHTML += "<hr>"
        element.innerHTML += `<div class="total"><p><strong>Total:</strong></p><p>${this.calcTotal().toFixed(2)}</div>`
        return element
    }

    public addRemoveEventListeners(){
        for (const shopItem of new Set(this.cart)){
            const removeOne = document.getElementById(`${shopItem.id}-removeOne`) as HTMLButtonElement;
            if (removeOne){
                removeOne.addEventListener("click", () => {
                    this.removeQuantity(shopItem, 1)
                })
            }

            const removeAll = document.getElementById(`${shopItem.id}-removeAll`) as HTMLButtonElement;
            if (removeAll){
                removeAll.addEventListener("click", () => {
                    this.removeFromCart(shopItem)
                })
            }
        }
    }

    
    public addToCart(item:Item){
        console.log(`${this.name} has added ${item.name} to cart\n`)
        this.cart.push(item)
        this.cart.sort((n1, n2) => {
            if (n1.price > n2.price){
                return 1;
            }
            if (n1.price < n2.price){
                return -1;
            }
            return 0
        })
        Shop.updateCart()
        
        
    }
    
    public removeFromCart(shopItem:Item){
        const count = this.cart.filter(item => item === shopItem).length
        this.cart.splice(this.cart.indexOf(shopItem), count)
        console.log(`Removing all ${shopItem.name}'s from cart...\n`)
        Shop.updateCart()
    }
    
    public removeQuantity(shopItem:Item, quantity:number){
        this.cart.splice(this.cart.indexOf(shopItem), quantity)
        console.log(`Removing x${quantity} ${shopItem.name}'s from cart...\n`)
        Shop.updateCart()  
    }
    
    public calcTotal(){
        let total = 0
        this.cart.forEach(item => {
            total += item.price
        })
        return total
    }

    public printCart(){
        console.log(`${this.name}'s Cart: `)
        this.cart.forEach(item => {
            console.log("      " + item.name)
        })
        console.log(" ")
    }

}

class Shop{
    
    constructor(
        private _item: Item[] = []
    ){
        this.item.push(new Item('Light Saber', 39.99, 'May the force be with you. Are you Jedi or Sith?'))
        this.item.push(new Item('MacBook Pro', 1599.99, 'Finish tasks at the speed of light. Equipped with retina display.'))
        this.item.push(new Item('Wireless Mouse', 64.99, 'Click your way to the top of the leaderboards. Do you even game?'))
        this.item.push(new Item("Witcher Mug", 14.99, "While the Witcher Slays your enemies have nice cup of victory"))
        this.item.push(new Item("Invisi-Robe", 728.99, "This robe will turn the wearer invisible. Be responsible!"))
        this.item.push(new Item("Hover Board", 3849.99, "Show us your wild side! Feel the wind in your hair!"))

        this.showItems()
    }
    public get item(): Item[] {
        return this._item;
    }
    public set item(value: Item[]) {
        this._item = value;
    }

    static myUser:User|undefined

    public showItems(){
        for (const shopItem of this._item){
            document.getElementById("shop")!.append(shopItem.itemElement())
        }
    }

    static updateCart(){
        const cart = document.getElementById("cart");

        if(Shop.myUser!.cart.length === 0){
            cart!.innerHTML = `<h1>No items in cart</h1>`
        } else {
            cart!.replaceChildren(Shop.myUser!.cartHTMLElement())
            Shop.myUser!.addRemoveEventListeners()
        }
    }

    static loginUser(event:Event){
        event.preventDefault()
        Shop.myUser = User.loggingInUser()
        console.log(Shop.myUser)
        if (Shop.myUser){
            const turnOff = document.getElementsByClassName('is-visible')
            for (const element of turnOff){
                console.log("Turning off", element);
                element.classList.replace('is-visible', 'is-invisible');
                
            }
            new Shop();
            const greeting = document.querySelector(".greeting")
            const greetingDiv = document.createElement("div")
            greeting?.append(greetingDiv)
            greetingDiv.innerHTML += `<h1>Hello ${Shop.myUser.name}</h1>` 
            Shop.myUser!.cart = []
            Shop.updateCart()
        }
        console.log("This is the login USer")
    }

}

const login = document.getElementById("login-button")
login?.addEventListener("click", (event:Event) => {
    console.log("click")
    Shop.loginUser(event)
})






