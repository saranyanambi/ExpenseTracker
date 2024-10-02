import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
import "./Pagination.css";
const Pagination=({currpage,setCurrpage,totalPageCount})=>{
    const handlenext=()=>{
        if(currpage<totalPageCount)
         {
             setCurrpage(currpage+1)
         } 
         else{
             return;
         }
     }
     const handleprev=()=>{
        if(currpage>=totalPageCount)
         {
             setCurrpage(currpage-1)
         } 
         else{
             return;
         }
     }
    return(

        
        <div className="Pagination-container">
            <button onClick={()=>handleprev()}><GrFormPreviousLink/></button>
            <span className="pagecount">{totalPageCount}</span>
            <button onClick={()=>handlenext()}><GrFormNextLink/></button>
        </div>
    )
}

export default Pagination;