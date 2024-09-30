import { useState } from "react"
import "./ExpenseTable.css"
import { MdModeEditOutline } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
const ExpenseTable=({categories,expense,handleexpenseUpdate})=>{
    const[edit,setEdit]=useState(false);
    const[remove,setRemove]=useState(false);
    const[expenseChange,setExpensechange]=useState({})
    const handleexpensexhange=(e)=>{
        const{name,value}=e.target;
        setExpensechange((prev)=>({...prev,[name]:value}));

    }
    const handleremove=(id)=>{
        const updatedExpense=expense.filter((data)=>data.id!=id);
        handleexpenseUpdate(updatedExpense);
    }
    const handleedit=(item)=>{
        setEdit(!edit)
        setExpensechange(item)
    }

    const updateexpense=(e)=>{
        e.preventDefault();
        const index=expense.findIndex((data)=>data.id===expenseChange.id)
        const updatedExpense=[...expense]
        if(index!=-1)
        {
            updatedExpense[index]={
                ...updatedExpense[index],
                ...expenseChange
            }
        }
        handleexpenseUpdate(updatedExpense);
        setEdit(!edit);

    }

    return(
        <div className="expense-conatiner">
        <h2>Recent Transation</h2>
        <div  className="container">
        {expense.length > 0 && 
         expense.map((item, idx) => (
        <div key={idx} className="expense-container">
            <div className="expense-right-container">
                <div style={{marginRight:"1rem"}}>icon</div>
            <div className="expense-right">
            <div>{item.title}</div>
            <div>{item.date}</div>
            </div>
            </div>
            <div className="expense-left-container">

                <div style={{marginRight:"1rem"}}>
                    {item.price}
                </div>
                    
                <div>
                <button className="deleteicon" style={{marginRight:"1rem"}} onClick={()=>handleremove(item.id)}><TiDeleteOutline style={{backgroundColor:"rgb(199, 69, 69)" }}/></button>
                
                </div>
                <div className="">
                <button className="editicon" style={{marginRight:"1rem"}} onClick={()=>handleedit(item)}><MdModeEditOutline/></button>
                </div>
                </div>
        </div>
    ))
}


        {edit &&
             <form onSubmit={updateexpense} >
             <h2>Add New Expense</h2>
             <div>
             <input required type="text" placeholder="Title" name="title" value={expenseChange.title} onChange={(e)=>handleexpensexhange(e)}/>
             <input required type="text" placeholder="Price" name="price" value={expenseChange.price} onChange={(e)=>handleexpensexhange(e)}/>
             </div>
             <div>
             <select
             required
             name="category"
             onChange={(e)=>handleexpensexhange(e)}>
                 
                     {categories.map((category,idx)=>(
                         <option key={idx} value={category}>{category}</option>
                     ))}
                     
                
             </select>
             <input type="date" placeholder="date" name="date" value={expenseChange.date}required onChange={(e)=>handleexpensexhange(e)}/>
             </div>
             <div>
             <button type="submit" className="incomebtn">Add Expense</button>
             <button type="button" onClick={()=>setEdit(!edit)}>Cancel</button>
             </div>
         </form>   }
        </div>
        </div>
    )
}
export default ExpenseTable