import React from 'react';
export const Icon=({children,fill=false}:{children:React.ReactNode,fill?:boolean})=><span className="material-symbols-outlined" style={fill?{fontVariationSettings:"'FILL' 1"}:undefined}>{children}</span>;
export const Card = ({
  children,
  className = '',
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`card ${className}`}>
    {children}
  </section>
);
export const Progress=({value,color='primary'}:{value:number,color?:string})=><div className="progress"><div className={`progress-fill ${color}`} style={{width:`${value}%`}}/></div>;
export const Badge=({children,tone='neutral'}:{children:React.ReactNode,tone?:string})=><span className={`badge ${tone}`}>{children}</span>;
export const SectionTitle=({title,sub,action}:{title:string,sub?:string,action?:React.ReactNode})=><div className="section-head"><div><h2>{title}</h2>{sub&&<p>{sub}</p>}</div>{action}</div>;
