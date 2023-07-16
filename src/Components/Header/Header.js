import HeaderCartButton from "./HeaderCartButton";
import classes from './Header.module.css'

const Header=(props)=>{

   return(
    <>
      <header className={classes.header}>
        <h1 className={classes.name}>ReactMeal</h1>
        <div className={classes.cart}>
           <HeaderCartButton onShow={props.onShow}/>
        </div>
      </header>
    </>
   )
}

export default Header;