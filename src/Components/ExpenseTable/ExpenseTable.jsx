import { useState } from "react"
import "./ExpenseTable.css"
import Pagination from "../Pagination/Pagination";
import { FaPizzaSlice, FaShoppingCart, FaPlane,FaFilm,FaShoppingBasket,FaEllipsisH} from 'react-icons/fa'; // Example imports
import Modal from "react-modal";

const ExpenseTable=({categories,expense,handleexpenseUpdate})=>{
    const categoryIcons={
       Food:<FaPizzaSlice/>,
        Grocery:<FaShoppingBasket/>,
        Travel:<FaPlane/>,
        Entertainment:<FaFilm/>,
        Shopping:<FaShoppingCart/>,
        Others:<FaEllipsisH/>
    }

    const modalStyle = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "500px",
          background: "rgba(255, 255, 255, 0.6)",
          borderRadius: "10px",
          border: "border: 1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: " 0 8px 12px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
        },
      };
      const [isModalOpen, setIsModalOpen] = useState(false);
    const[edit,setEdit]=useState(false);
    const[expenseChange,setExpensechange]=useState({});
    const[currpage,setCurrpage]=useState(1);

    const expenseCount=3;
    const totalPageCount=Math.ceil(expense.length/expenseCount);
    const showedExpense=expense.slice((currpage-1)*expenseCount,currpage*expenseCount);


    const handleexpensexhange=(e)=>{
        const{name,value}=e.target;
        setExpensechange((prev)=>({...prev,[name]:value}));

    }
    const handleremove=(id)=>{
        const updatedExpense=expense.filter((data)=>data.id!==id);
        handleexpenseUpdate(updatedExpense);

    }
    const handleedit=(item)=>{
        setEdit(!edit)
        setExpensechange(item)
        setIsModalOpen(true)
    }

    const updateexpense=(e)=>{
        e.preventDefault();
        const index=expense.findIndex((data)=>data.id===expenseChange.id)
        const updatedExpense=[...expense]
        if(index!==-1)
        {
            updatedExpense[index]={
                ...updatedExpense[index],
                ...expenseChange
            }
        }
        handleexpenseUpdate(updatedExpense);
        setEdit(!edit);
        setIsModalOpen(false)

    }

    return(
        <div className="expense-conatiner">
         <div className="head-expense"style={{display:"flex",justifyContent:"flex-start", color:"#FFFFFF"}}>
        <h2>Recent Transation</h2>
        </div>   
        <br/>
        <div  className="expense-table-container">
        {showedExpense.length > 0 && 
         showedExpense.map((item, idx) => (
            <div>
        <div key={idx} className="expense-row-container">
            <div className="expense-right-container">
                <div className="categoryicon">{categoryIcons[item.category]}</div>
            <div className="expense-right">
            <div>{item.title}</div>
            <div>{item.date}</div>
            </div>
            </div>
            <div className="expense-left-container">

                <div style={{color:"orange"}}>
                    {`₹${item.price}`}
                </div>
                    
                <div>
                <button className="deleteicon" style={{backgroundColor:"#FF3E3E"}} onClick={()=>handleremove(item.id)}>
                    <img src="data:image/svg+xml,%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Transformed%20by:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2032%2032'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20fill='%23fff'%20stroke='%23fff'%3e%3cg%20id='SVGRepo_bgCarrier'%20stroke-width='0'/%3e%3cg%20id='SVGRepo_tracerCarrier'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cg%20id='SVGRepo_iconCarrier'%3e%3cg%20id='icomoon-ignore'%3e%3c/g%3e%3cpath%20d='M6.576%206.576c-5.205%205.205-5.205%2013.643%200%2018.849s13.643%205.205%2018.849-0c5.206-5.206%205.206-13.643%200-18.849s-13.643-5.205-18.849%200zM24.67%2024.67c-4.781%204.781-12.56%204.781-17.341%200s-4.781-12.56%200-17.341c4.781-4.781%2012.56-4.781%2017.341%200s4.78%2012.56-0%2017.341z'%20fill='%23fff'%3e%3c/path%3e%3cpath%20d='M10.722%209.969l-0.754%200.754%205.278%205.278-5.253%205.253%200.754%200.754%205.253-5.253%205.253%205.253%200.754-0.754-5.253-5.253%205.278-5.278-0.754-0.754-5.278%205.278z'%20fill='%23fff'%3e%3c/path%3e%3c/g%3e%3c/svg%3e" alt="delete"/>
                    </button>
                
                </div>
                <div className="">
                <button className="deleteicon" style={{backgroundColor: "#F4BB4A"}} onClick={()=>handleedit(item)}><img src="data:image/svg+xml,%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Transformed%20by:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%20stroke='%23fff'%3e%3cg%20id='SVGRepo_bgCarrier'%20stroke-width='0'/%3e%3cg%20id='SVGRepo_tracerCarrier'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cg%20id='SVGRepo_iconCarrier'%3e%3cpath%20d='M4.5%2017.2071V19C4.5%2019.2761%204.72386%2019.5%205%2019.5H6.79289C6.9255%2019.5%207.05268%2019.4473%207.14645%2019.3536L15.6452%2010.8548L13.1452%208.35485L4.64645%2016.8536C4.55268%2016.9473%204.5%2017.0745%204.5%2017.2071Z'%20stroke='%23fffff'/%3e%3cpath%20d='M15.0897%206.4103L17.5897%208.9103L18.7929%207.70711C19.1834%207.31658%2019.1834%206.68342%2018.7929%206.2929L17.7071%205.20711C17.3166%204.81658%2016.6834%204.81658%2016.2929%205.20711L15.0897%206.4103Z'%20stroke='%23fffff'/%3e%3c/g%3e%3c/svg%3e" alt="edit"/>
                </button>
                </div>
                </div>
               
        </div>
        <hr/>
        </div>
        
    ))
}
   
    <Pagination currpage={currpage} setCurrpage={setCurrpage} totalPageCount={totalPageCount}/>

    <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyle}
        contentLabel="Edit Expense"
      >
        {edit &&
             <form onSubmit={updateexpense} className="expenseform">
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
             <button type="button" onClick={()=>setIsModalOpen(false)}>Cancel</button>
             </div>
         </form>   }
         </Modal>
        </div>
        </div>
    )
}
export default ExpenseTable