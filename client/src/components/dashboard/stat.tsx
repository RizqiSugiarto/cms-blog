import React from "react";

type StatType = {
    icon: React.ReactNode;
    title: String;
    value: string;
    desc: string
}
const Stat: React.FC<StatType> = ({icon, title, value, desc}) => {
    return (
        <div className="stats shadow w-full">
        <div className="stat">
            <div className="stat-figure text-2xl text-primary">{icon}</div>
            <div className="stat-title">{title}</div>
            <div className="stat-value text-primary">{value}</div>
            <div className="stat-desc">{desc}</div>
        </div>
    </div>
    )
}

export default Stat