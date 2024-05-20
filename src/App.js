import React,{useState,useEffect} from 'react'
import './a.css'
import alanBtn from '@alan-ai/alan-sdk-web';

 let alertcheck=0
function App() {
 
  const [cart,setCart]=useState([])
  const [menuItems,setMenuItems]=useState([])
  useEffect(() => {
    alanBtn({
        key: '303b1a3be27b445915d05ec5deea9de82e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: (commandData) => {
         if(commandData.command==='getMenu'){
          setMenuItems(commandData.data)
         }
         else if(commandData.command==='addToCart'){
           addToCart(commandData.data)
         }
        }
    });
  }, []);

  const addToCart=(menuItem)=>{
    setCart((oldCart)=>{
        return [...oldCart,menuItem]
    })  
  }
  const alertshow=()=>
  {
    if (alertcheck===0){
      alertcheck=1
      alert('Please use the mic button to show the menu and add items to cart')
    }
  }
  const hasProducts=menuItems.length>0
  alertshow()
  return (
    <div className="App">
     <div className="header">My Menu AI</div>
     <div className="menu"> {menuItems.map(menuItem=>(
      <li key={menuItem.name}>{menuItem.name}-${menuItem.price}-{menuItem.category}
      </li>
        
    ))}</div>
    {hasProducts?<div className="cart">
    <h2>Cart:</h2>
    {cart.map(cartItem=>(
      <li key={cartItem.name}>
        {cartItem.name}-${cartItem.price}-{cartItem.category}
      </li>
     
    ))} </div>:<p></p>}
    </div>
    )
    }
export default App;
