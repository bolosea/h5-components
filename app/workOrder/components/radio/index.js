import React, { useState, useEffect } from 'react'
import './index.less'

export default function Radio({data,onChange}){

  const [value, setValue] = useState(data && data.initValue)

  return (
    <div className="bnq-radio">
      <div className="bnq-radio-item">
      {
        data && data.map(d=>{
        const {label,value: val} = d
        return <span key={label} className={value === val ? 'current': ''} onClick={(e)=>{
          setValue(val)
          onChange && onChange(val)
        }}>{label}</span>
        })
      }
      </div>
    </div>
  )
}
