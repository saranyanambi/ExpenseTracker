
import { useEffect,useState } from "react";
// import Modal from "react-modal";
import "./Wallet.css";
import Piechart from "../PieChart/PieChart"
const Wallet=({categories,Balance,setBalance,expense,setExepense,handleexpenseUpdate})=>{
    console.log(expense)
    // const catagories=["Food","Entertainment"];
    
    // const[Balance,setBalance]=useState(
    //     localStorage.getItem("Balance")?parseInt(localStorage.getItem("Balance"),10):5000);
   
    //     const[expense,setExepense]=useState(
    //     localStorage.getItem("expenses")?.length > 0
    //     ? JSON.parse(localStorage.getItem("expenses"))
    //     : []
    // );

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

    const handleexpensexhange=(e)=>{
        const{name,value}=e.target;
        setNewexpense((prev)=>({...prev,[name]:value}));
        console.log(name,value)

    }

    const addincome=(e)=>{
        e.preventDefault();
        const newBalance = Balance + parseInt(income, 10);
        setBalance(newBalance);
        localStorage.setItem("Balance", newBalance);
        setIncomeform(!incomeform);
        setincome("");
        
    }

    const addexpense=(e)=>{
        e.preventDefault();
        // const expensetoAdd={
        //     id:Date.now(),
        //     title:newexpense.title,
        //     price:parseFloat(newexpense.price),
        //     date:newexpense.date,
        //     category:newexpense.category

        // }
        // let latestExpense=[...expense,expensetoAdd]
        // setExepense(latestExpense);
        // localStorage.setItem("Expense",JSON.stringify(latestExpense));
        newexpense.id=Date.now();

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

    console.log(newexpense.category);
    // useEffect(()=>{
       
    //    handleexpenseUpdate(expense)
    // },[expense],handleexpenseUpdate)
    
    useEffect(()=>{
        if(!localStorage.getItem("Balance"))
        {
            localStorage.setItem("Balance","5000")
        }
      
    },[])

    return(
        <div className="container">
            <div className="wallet-box-container">
                <div className="wallet-box">
                    <h1>Wallet Balance:<span style={{color:"#9DFF5B"}}>{Balance}</span></h1>
                    <button onClick={()=>setIncomeform(!incomeform)} className="addincome">+Add Income</button>
                </div>
                <div className="wallet-box">
                    <h1>Wallet Balance:<span></span></h1>
                    <button onClick={()=>setExpenseform(!expenseform)} className="addexpense">+Add expense</button>
                </div>
                <Piechart expense={expense}/>
                </div>
                <div>
                    {incomeform &&
                        <form onSubmit={addincome}>
                            <h2>Add New Income</h2>
                            <input
                            className="income-input"
                            required
                            name="income"
                            placeholder="income amount"
                            type="number"
                            onChange={(e)=>handleincomechange(e)}/>
                            <button type="submit" className="incomebtn">Add Income</button>
                            <button className="income-cancel" onClick={()=>setIncomeform(!incomeform)}>Cancel</button>
                        </form>
                    }
                </div>
                <div>
                    {expenseform &&

                        <form onSubmit={addexpense} >
                            <h2>Add New Expense</h2>
                            <div>
                            <input required type="text" placeholder="Title" name="title" onChange={(e)=>handleexpensexhange(e)}/>
                            <input required type="text" placeholder="Price" name="price" onChange={(e)=>handleexpensexhange(e)}/>
                            </div>
                            <div>
                            <select
                            required
                            name="category"
                            onChange={handleexpensexhange}>
                                <option value={""}>select a Category</option>
                                    {categories.map((category,idx)=>(
                                        <option key={idx} value={category}>{category}</option>
                                    ))}
                                    
                               
                            </select>
                            <input type="date" placeholder="date" name="date" required onChange={(e)=>handleexpensexhange(e)}/>
                            </div>
                            <div>
                            <button type="submit" className="incomebtn">Add Expense</button>
                            <button type="button" onClick={()=>setExpenseform(!expenseform)}>Cancel</button>
                            </div>
                        </form>
                    }
                </div>

           
        </div>
    )
}
export default Wallet;