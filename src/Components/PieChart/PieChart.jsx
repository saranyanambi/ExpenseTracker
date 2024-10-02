import React from "react";
import {PieChart ,Pie, Cell,Legend,ResponsiveContainer} from "recharts";
import "./pieChart.css";

const filterCategory=(data)=>{
    const pieChartCategory={}
    
    data.forEach(element => {
        if(pieChartCategory[element.category]){
            pieChartCategory[element.category]+=parseInt(element.price,10);
        }
        else{
            pieChartCategory[element.category]=parseInt(element.price,10);
        }
    });
    return Object.keys(pieChartCategory).map((category,idx)=>({
        id:idx,
        name:category,
        value:pieChartCategory[category]
    }))
}

const Piechart=({expense})=>{
    const color=["#FF9304","#A000FF","#FDE006"];
    const radian=Math.PI/180;
    const percentagelabel=({cx,cy,midAngle,innerRadius,outerRadius,percent,idx})=>{
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * radian);
  const y = cy + radius * Math.sin(-midAngle * radian);
   return(
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    {`${(percent * 100).toFixed(0)}%`}
  </text>
   )
    }
    const pieChartData=filterCategory(expense);
    return(
       
        <ResponsiveContainer width="100%" height={300}>
    <PieChart>
        <Pie
        data={pieChartData}
        cx="50%"
        cy="50%"
        fill="#FF9304"
        dataKey="value"
        outerRadius={100}
        isAnimationActive={true}
        label={percentagelabel}
        labelLine={false}
        >
            {pieChartData.map((item,idx)=>(
                <Cell key={`cell-${item.id}`} fill={color[item.id%color.length]}/>
            ))}
            </Pie>
            <Legend style={{position:"absolute", bottom:"2rem"}}/>
    </PieChart>
    </ResponsiveContainer>
   
    )
}

export default Piechart;