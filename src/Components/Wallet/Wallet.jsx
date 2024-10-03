
import { useEffect,useState } from "react";
import Model from "react-modal";
import "./Wallet.css";
import Piechart from "../PieChart/PieChart";
import {useSnackbar} from "notistack";
const Wallet=({categories,Balance,setBalance,expense,handleexpenseUpdate})=>{
   
    const { enqueueSnackbar } = useSnackbar()

    const model={
      content:{ 
         top:"50%",
        left:"50%",
        bottom:"auto",
        right:"auto",
        backgroundColor:"#FFFFFFC4",
        borderRadius:"1rem",
        maxWidth:"90%",
        width:"400px",
        borderRadius:"1rem",
        padding:"2rem",
        display:"flex",
        alignitems:"center",
        justifyContent:"center",
        transform: "translate(-50%, -50%)",
        margin:"1rem"
      }



    }
    const[income,setincome]=useState("");
    const[newexpense,setNewexpense]=useState({
        title:"",
        category:"",
        id:"",
        price:"",
        date:"",
    })
    
    const[incomeform,setIncomeform]=useState(false);
    const[expenseform,setExpenseform]=useState(false);

    const handleincomechange=(e)=>{
        setincome(e.target.value);
    }

    const getExpenseAmount=(expense)=>{
        return expense.reduce((total,expense)=>total+parseInt(expense.price,10),0)
    }
    const handleexpensexhange=(e)=>{
        const{name,value}=e.target;
        setNewexpense((prev)=>({...prev,[name]:value}));
        console.log(name,value)

    }

    const addincome=(e)=>{
        e.preventDefault();
        if(!isNaN(income)){
        const newBalance = Balance + parseInt(income, 10);
        setBalance(newBalance);
        localStorage.setItem("TotalBalance",`${newBalance}`)
        
        setIncomeform(!incomeform);
        setincome("");
        }
        
    }

    const addexpense=(e)=>{
        e.preventDefault();
       if(Balance<newexpense.price)
       {
       return enqueueSnackbar("Couldn't not add to Expense because you don't have the enough balance",{variant:"error"});
       }
        newexpense.id=Date.now();
       const newamount=Balance-newexpense.price;
       setBalance(newamount)
       localStorage.setItem("Balance",`${newamount}`);
        let expensetoAdd={...newexpense,id:Date.now() }

        let updateExpense=[...expense,expensetoAdd];
       localStorage.setItem("Expense",JSON.stringify(updateExpense));
       handleexpenseUpdate(updateExpense);
    
        setExpenseform(!expenseform);
        setNewexpense({
            title:"",
            category:"",
            id:"",
            price:"",
            date:"",
        })

    }

    
    useEffect(()=>{
        if(!localStorage.getItem("TotalBalance"))
        {
            localStorage.setItem("TotalBalance","5000")
        }
      
    },[])

    return(
        <>
        <div style={{display:"flex",justifyContent:"flex-start", color:"#FFFFFF"}}>
        <h1>Expense Tracker</h1>
        </div>
        
        <div className="maincontainer">
            
            <div className="wallet-box-container">
                <div className="wallet-box">
                    <h2 style={{color:"white"}}>Wallet Balance:<span style={{color:"#9DFF5B"}}>{`₹${Balance}`}</span></h2>
                    <button onClick={()=>setIncomeform(!incomeform)} className="addincome">+Add Income</button>
                </div>
                <div className="wallet-box">
                    <h2 style={{color:"white"}}>Wallet Balance:<span style={{color:"#F4BB4A"}}>₹{getExpenseAmount(expense)}</span></h2>
                    <button onClick={()=>setExpenseform(!expenseform)} className="addexpense">+Add expense</button>
                </div>
                
                </div>
                <Piechart expense={expense}/>
            
                
                </div>
                <div>
                    <Model
                    isOpen={incomeform}
                     onRequestClose={() => setIncomeform(false)} 
                     style={model}>  
                    {incomeform &&
                        <form onSubmit={addincome}>
                            <h2>Add New Income</h2>
                            <input
                            className="income-input btn"
                            required
                            name="income"
                            placeholder="income amount"
                            type="number"
                            onChange={(e)=>handleincomechange(e)}/>
                            <button type="submit" className="incomebtn btn">Add Income</button>
                            <button className="btn" onClick={()=>setIncomeform(!incomeform)}>Cancel</button>
                        </form>
                    }
                    </Model>
                </div>
                <div>
                <Model isOpen={expenseform}
                     onRequestClose={() => setExpenseform(false)} 
                     style={model}>
                    {expenseform &&

                        <form onSubmit={addexpense} >
                            <h2>Add New Expense</h2>
                            <div className="expense-btn">
                            <input required type="text" placeholder="Title" name="title" onChange={(e)=>handleexpensexhange(e)} className="btn"/>
                            <input required type="text" placeholder="Price" name="price" onChange={(e)=>handleexpensexhange(e)}  className="btn"/>
                            </div>
                            <div>
                            <select
                            required
                            name="category"
                             className="btn"
                            onChange={handleexpensexhange}>
                                <option value={""}>select a Category</option>
                                    {categories.map((category,idx)=>(
                                        <option key={idx} value={category}>{category}</option>
                                    ))}
                                    
                               
                            </select>
                            <input type="date" placeholder="date" name="date" required onChange={(e)=>handleexpensexhange(e)}  className="btn"/>
                            </div>
                            <div>
                            <button type="submit" className="incomebtn btn">Add Expense</button>
                            <button type="button" onClick={()=>setExpenseform(!expenseform)}  className="btn">Cancel</button>
                            </div>
                        </form>
                    }
                    </Model>
                </div>

           
      
        </>
    )
}
export default Wallet;