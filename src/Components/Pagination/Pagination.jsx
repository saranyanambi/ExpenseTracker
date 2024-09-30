import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
import "./Pagination.css";
const Pagination=({currpage,setCurrpage,totalPageCount})=>{
    return(
        <div className="Pagination-container">
            <button onClick={()=>setCurrpage(currpage-1)}><GrFormPreviousLink/></button>
            <span className="pagecount">{totalPageCount}</span>
            <button onClick={()=>setCurrpage(currpage+1)}><GrFormNextLink/></button>
        </div>
    )
}

export default Pagination;