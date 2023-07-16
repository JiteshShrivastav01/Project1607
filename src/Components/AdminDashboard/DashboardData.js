import classes from './DashboardData.module.css'
import AuthContext from '../Context/AuthContext'
import { useContext } from 'react'


const DashboardData=()=>{

    const ctx=useContext(AuthContext)
    const onStock=ctx.stock
    
    const AddCart=(stock)=>{
        ctx.onCart({MedicineName:stock.MedicineName , MedicinePrice:stock.MedicinePrice})
    }

    return(
       <>
        <h1 className={classes.heading}>Medicine Stock</h1>
        <table className={classes.table}>
            <tr className={classes.tr}>
                <th>Medicine Name</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
            {
                onStock.map((stock)=>(
                    <tr className={classes.tr}>
                        <td>{stock.MedicineName}</td>
                        <td>{stock.MedicinePrice}</td>
                        <td>{stock.MedicineQuantity}</td>
                        <td className={classes.btn}>
                            <button className={classes.btn2} onClick={()=>AddCart(stock)}>Add Cart</button>
                        </td>
                    </tr>
                ))
            }
        </table>
       </>
    )
}

export default DashboardData