

import { BarChart, XAxis, YAxis ,Bar, ResponsiveContainer} from "recharts";
import "./LineChart.css";
  

const filterTotal=(data)=>{
    const totalamount=new Map();

    data.forEach(element => {
        const cost=Number(element.price) || 0;
        if(!totalamount.has(element.category))
        {
            totalamount.set(element.category,{category:element.category,totalPrice:0})
        }
        totalamount.get(element.category).totalPrice+=cost;
    });

    return Array.from(totalamount.values())
    .sort((a,b)=>b.totalPrice-a.totalPrice)
    .map((item)=>({name:item.category,value:item.totalPrice}))
}

const LineChart=({data})=>{
    const linechartdata=filterTotal(data);
    return(
       
      <div className="linechart-container">
            
     <ResponsiveContainer width="100%" height={400}>
       
        <BarChart
        data={linechartdata}
        layout="vertical"
        margin={{ top: 0, right: 20, left: 20, bottom:80 }}
      >
         <XAxis type="number" hide/>   
         <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} interval={0}/>
         <Bar dataKey="value" fill="#8784D2"
 barSize={20} radius={[0,10,10,0]}/>
        </BarChart>
        </ResponsiveContainer>
        </div>
      
    )
}

export default LineChart;