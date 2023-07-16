import { useState , useEffect} from "react";
import AuthContext from "./AuthContext";


const ContextProvider=(props)=>{
    const [cart,setCart]=useState([])
    const [availableStocks,setAvailableStocks]=useState([])
    const [Quantity,setQuantity]=useState(0)

    const AvailableStockHandler=async (Medicine)=>{
        const isExistingStock=availableStocks.find(obj=>obj.MedicineName===Medicine.MedicineName)
        const ExistingStockIndex=availableStocks.findIndex(obj=>obj.MedicineName===Medicine.MedicineName) 
        try{
            if(!isExistingStock){
                const res=await fetch('https://project2-674f5-default-rtdb.firebaseio.com/availableStock.json',{
                    method:'POST',
                    body:JSON.stringify(Medicine),
                })
                const data=res.json()
            }
        }
        catch(err){
            console.log(err)
        }   
        
    }
 
    
    const cartItem =async (Medicine) => {
        const isExistingStock=availableStocks.find(obj=>obj.MedicineName===Medicine.MedicineName)
        const isExistingCart=cart.find(obj=>obj.MedicineName===Medicine.MedicineName)
        if(!isExistingCart){
            const res=await fetch('https://project2-674f5-default-rtdb.firebaseio.com/Cart.json',{
                method:'POST',
                body:JSON.stringify({...Medicine, Quantity:1}),
                headers:{
                    'Content-type' : 'application/json'
                }
            })
            const data=res.json()
        }
        else{
            const Update={...isExistingCart,Quantity:isExistingCart.Quantity+1}
            const res=await fetch(`https://project2-674f5-default-rtdb.firebaseio.com/Cart/${Update}.json`,{
                method:'PUT',
                body:JSON.stringify(Update),
                headers:{
                    'Content-type' : 'application/json'
                }
            })
            const data=res.json()
        }
        const updatedItem={...isExistingStock,MedicineQuantity:isExistingStock.MedicineQuantity-1}
        console.log(updatedItem.id)
        const stock=await fetch(`https://project2-674f5-default-rtdb.firebaseio.com/availableStock/${updatedItem.id}.json`,{
            method:'PUT',
            body:JSON.stringify(updatedItem),
            headers:{
                'Content-type' : 'application/json'
            }
        })
    }


    useEffect(()=>{
        async function showStock(){
            try{
                const res=await fetch('https://project2-674f5-default-rtdb.firebaseio.com/availableStock.json')
                const data= await res.json()
                
                const loader=[]
                for(let key in data){
                   loader.push({
                    id:key,
                    MedicineName:data[key].MedicineName,
                    MedicinePrice:data[key].MedicinePrice,
                    MedicineQuantity:data[key].MedicineQuantity
                   })
                }
                setAvailableStocks(loader)
            }
            catch(err){
                console.log(err)
            }
        }

        async function showCart(){
            try{
                const res=await fetch('https://project2-674f5-default-rtdb.firebaseio.com/availableStock.json')
                const data= await res.json()
                
                const loader=[]
                for(let key in data){
                   loader.push({
                    id:key,
                    MedicineName:data[key].MedicineName,
                    MedicinePrice:data[key].MedicinePrice,
                   })
                }
                setCart(loader)
            }
            catch(err){
                console.log(err)
            }
        }

        // function total(){
        //     let a=0
        //     cart.map(item=>{
        //         a += item.Quantity
        //         return a
        //     })
        //     setQuantity(a)
        // }
        // total()
        showCart()
        showStock()
    },[AvailableStockHandler,cartItem])
      

    
    

    const value={
        stock:availableStocks,
        onStock:AvailableStockHandler,
        cartItems:cart,
        onCart:cartItem,
        cartQuantity:Quantity
    }

    return(
       <AuthContext.Provider value={value}>
        {props.children}
       </AuthContext.Provider>
    )
}

export default ContextProvider