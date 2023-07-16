import { Fragment, useContext, useState } from "react";
import Form from '../UI/Form'
import DashboardData from "./DashboardData";
import classes from './DashboardForm.module.css'
import Card from '../UI/Card'
import AuthContext from "../Context/AuthContext";



const DashboardForm = () => {
    const [MedicineName,setMedicineName]=useState('')
    const [MedicinePrice,setMedicinePrice]=useState('')
    const [MedicineQuantity,setMedicineQuantity]=useState('')
    const [isValid,setIsValid]=useState(false)
    const [showForm,setShowForm]=useState(false)
    const ctx=useContext(AuthContext)
    const stock=ctx.stock
    

    const MedicineNameHandler=(e)=>{
        e.preventDefault();
        setMedicineName(e.target.value)
        if(e.target.value.trim().length> 0 && MedicinePrice > 0 && MedicineQuantity>0){
            setIsValid(true)
        }
        else{
            setIsValid(false)
        }
    }
    const MedicinePriceHandler=(e)=>{
        e.preventDefault();
        setMedicinePrice(e.target.value)
        if(MedicineName.trim().length> 0 && e.target.value > 0 && MedicineQuantity>0){
            setIsValid(true)
        }
        else{
            setIsValid(false)
        }
    }
    const MedicineQuantityHandler=(e)=>{
        e.preventDefault();
        setMedicineQuantity(e.target.value)
        if(MedicineName.trim().length> 0 && MedicinePrice>0 && e.target.value>0){
            setIsValid(true)
        }
        else{
            setIsValid(false)
        }
    }

    const SubmitHandler = (e) => {
        e.preventDefault()
        const newMedicine = {MedicineName:MedicineName , MedicinePrice:MedicinePrice , MedicineQuantity : MedicineQuantity}
        ctx.onStock(newMedicine)
        setMedicineName('')
        setMedicinePrice('')
        setMedicineQuantity('')
        setIsValid(false)

    }

    const showFormOnScreen=()=>{
        setShowForm(!showForm)
    }

    return(
        <Fragment>
        <div className={classes.dashboard}>
            <div className="form">
            <Form >
            <button onClick={showFormOnScreen} className={classes.button}>
                To Add Stock ...
            </button>
            { showForm &&
            <form onSubmit={SubmitHandler}>
                <h2>Add Stock</h2><hr />
                <label htmlFor="MedicineName">Medicine Name  </label>
                <input type="text" value={MedicineName} onChange={MedicineNameHandler}/><br />
                <label htmlFor="MedicinePrice">Medicine Price</label>
                <input type="Number" value={MedicinePrice} onChange={MedicinePriceHandler} /><br />
                <label htmlFor="MedicineQuantity">Medicine Quantity</label>
                <input type="number" value={MedicineQuantity} onChange={MedicineQuantityHandler}/><br />

                <button type="submit" disabled={!isValid} >Add Stock</button>
            </form>
            }
            </Form>
            </div>

            <div className="data">
                <Card><DashboardData onStock={stock} /></Card>
            </div>
        </div>
        </Fragment>
    )


}

export default DashboardForm