import { useState,useEffect } from "react";
import "./MainBoard.css";
import Wallet from "../Wallet/Wallet";
import ExpenseTable from "../ExpenseTable/ExpenseTable"
import LineChart from "../LineChart/LineChart";

const Mainboard=()=>{

    const categories = [
        "Food",
        "Grocery",
        "Travel",
      ];
    const[Balance,setBalance]=useState(
        localStorage.getItem("Balance")?parseInt(localStorage.getItem("Balance"),10):5000);
   

        const[expense,setExepense]=useState([]);

useEffect(() => {
    const storedExpenses = localStorage.getItem("Expense");
    if (storedExpenses) {
        setExepense(JSON.parse(storedExpenses));
    }
}, []);

const handleexpenseUpdate=(expense)=>{
    setExepense(expense);

    let expenseamount=expense.reduce((amount,expense)=>amount+parseInt(expense.price,10),0);
    const availableBalance=localStorage.getItem("TotalBalance")-expenseamount;
    
    setBalance(availableBalance);

    localStorage.setItem("Balance",availableBalance);
    localStorage.setItem("Expense",JSON.stringify(expense));
};
    
    return(
        <div className="total-conatiner">
        <Wallet categories={categories} Balance={Balance} setBalance={setBalance} expense={expense} setExepense={setExepense} handleexpenseUpdate={handleexpenseUpdate}/>
        {
            expense.length >0&&
            
            
            <div className="expense-linechart-container">
           
                <ExpenseTable categories={categories} expense={expense} handleexpenseUpdate={handleexpenseUpdate}/>
                
                <div className="top-expense">
                    <div className="heading">
                   <h2>Top Expenses</h2>
                   </div>
                <LineChart data={expense}/>
                </div>
                </div>
                
        }
        </div>
    )
}
export default Mainboard