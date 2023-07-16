import CartIcon from "./CartIcon";
import classes from './HeaderCartButton.module.css'
import AuthContext from "../Context/AuthContext";
import { useContext } from "react";


const HeaderCartButton = (props) => {
   const cartItemCtx=useContext(AuthContext)

    return (
       <>
        <div>
           <button className={classes.button} onClick={props.onShow}>
                <span className={classes.icon}>
                  <CartIcon/>
                </span>
                <span>
                   Your Cart
                </span>
                <span className={classes.badge}>
                    {cartItemCtx.cartItems.length}
                </span>
        </button>
    </div>

       </>
    )
}

export default HeaderCartButton