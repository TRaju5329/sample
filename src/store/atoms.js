// atoms.js
import { atom } from "jotai";


export const categoriesAtom = atom([
  { id: '1', title: 'All', },
  { id: '2', title: 'Fruits',filter: ['Apple', 'Banana', 'Orange', 'Grapes'] },
  { id: '3', title: 'Vegitable', filter: ['Tamata','vankaya', 'bendakaya' ] },
  { id: '4', title: 'Non Veg', filter: ['chikan','Motton' ,'fish'] },
])

// Atom for the list of fruits with prices and quantities
export const fruitsAtom = atom([
  { id: 1, name: "Apple", price: 20, quantity: 0 },
  { id: 2, name: "Banana", price: 5, quantity: 0 },
  { id: 3, name: "Orange", price: 10, quantity: 0 },
  { id: 4, name: "Grapes", price: 15, quantity: 0 },
  { id: 5, name: "Tamata", price: 25, quantity: 0 },
  { id: 6, name: "vankaya", price: 30, quantity: 0 },
  { id: 7, name: "bendakaya", price: 40, quantity: 0 },
  { id: 8, name: "chikan", price: 50, quantity: 0 },
  { id: 9, name: "Motton", price: 35, quantity: 0 },
  { id: 10, name: "fish", price: 55, quantity: 0 },
]);


// Selector atom to calculate total quantity
export const totalQuantityAtom = atom((get) =>
  get(fruitsAtom).reduce((total, fruit) => total + fruit.quantity, 0)
);

// Selector atom to calculate total price
export const totalPriceAtom = atom((get) =>
  get(fruitsAtom).reduce((total, fruit) => total + fruit.quantity * fruit.price, 0)
);
