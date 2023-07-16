import Modal from '../UI/Modal'
import AuthContext from '../Context/AuthContext'
import { useContext } from 'react'


const Cart=(props)=>{
    const ctx=useContext(AuthContext)
    const items=ctx.cartItems

    return (
        <>
         <Modal onClose={props.onClose}>
            {
                items.map((items)=>(
                    <li>{items.MedicineName} -- {items.Quantity}</li>
                ))
            }

            <button onClick={props.onClose}>Close</button>
         </Modal>
        </>
    )
}

export default Cart