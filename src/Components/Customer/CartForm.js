import { useContext, useState } from "react";
import Form from "../UI/Form";
import AuthContext from "../Context/AuthContext";
import Modal from "../UI/Modal";


const CartForm=()=>{
    const [MedicineToBuy,setMedicineToBuy]=useState('')
    const [QuantityToBuy,setQuantityToBuy]=useState('')
    const [cartItem,setCartItem]=useState([])
    const [isValid,setIsValid]=useState(false)
    const [isError,setIsError]=useState(false)
    const [Error,setError]=useState('')
    const ctx=useContext(AuthContext)
    const stock=ctx.stock

    const MedicineToBuyHandler=(e)=>{
        setMedicineToBuy(e.target.value)
        if(e.target.value.trim().length > 0 && QuantityToBuy>1 ){
            setIsValid(true)
        }
        else{
            setIsValid(false)
        }
    }

    const QuantityToBuyHandler=(e)=>{
        setQuantityToBuy(e.target.value)

        if(MedicineToBuy.trim().length>0 && e.target.value>1){
            setIsValid(true)
        }
        else{
            setIsValid(false)
        }
    }

    const hideError=()=>{
        setIsError(false)
        setError('')
    }

    const SubmitHandler=(e)=>{
       e.preventDefault()       
       const isMedicineInStock=stock.some(medicine => medicine.MedicineName === MedicineToBuy)
       
       if(isMedicineInStock){
        const findIndexOfMedicine=stock.findIndex(medicine => medicine.MedicineName === MedicineToBuy)
        if(stock[findIndexOfMedicine].MedicineQuantity!==0 && stock[findIndexOfMedicine].MedicineQuantity < QuantityToBuy){
         setError(`Only ${stock[findIndexOfMedicine].MedicineQuantity} Quantity is available.`)
         setIsError(true)
         setMedicineToBuy('')
         setQuantityToBuy('')
         setIsValid(false)
         return
        }
        else if(stock[findIndexOfMedicine].MedicineQuantity <=0){
         setError(`${MedicineToBuy} is out of stock`)
         setIsError(true)
         setMedicineToBuy('')
         setQuantityToBuy('')
         setIsValid(false)
         return
        }
       const Medicine = {MedicineName : MedicineToBuy , Quantity : QuantityToBuy}
       setCartItem([...cartItem,Medicine])
       ctx.onCart(Medicine)
       }
       else{
        setIsError(true)
        setError(`${MedicineToBuy} is not in stock.` )
       }
       setMedicineToBuy('')
       setQuantityToBuy('')
       setIsValid(false)
    }
    
    

    return(
        <>
          <Form>
            <form onSubmit={SubmitHandler}>
                <label htmlFor="MedicineToBuy">Medicine Name</label>
                <input type="text" value={MedicineToBuy} onChange={MedicineToBuyHandler} />
                <label htmlFor="QuantityToBuy">Quantity </label>
                <input type="number" value={QuantityToBuy} onChange={QuantityToBuyHandler} />
                <button type="submit" disabled={!isValid}>Add Cart</button>
            </form>
          </Form>
          {
            isError && 
            <Modal onClose={hideError}>
                  <h1>{Error}</h1>
            </Modal>
          }
        </>
    )
}

export default CartForm