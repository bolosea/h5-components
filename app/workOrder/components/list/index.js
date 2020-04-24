import React, { useState, useEffect } from 'react'
import './index.less'

export default function List({data = [],fields = [],clickCallback}){

  return (
    <div className='list'>

      {
        data && data.map(d=>{
          return (
            <div key={d.id} className="item" onClick={()=>clickCallback && clickCallback(d.id)}>
              <div className="title">
                <span>单号: {d.workOrderComplainCode || d.workOrderGovCode}</span>
                <span className='status'>{d.nodeStatusName}</span>
              </div>
              <div className="detail">
                {
                  fields.map(field => {
                    const key = field['id']
                    const value = d[key]
                    return <p key={key}><span>{[field['name']]}: {value?value:'暂无数据'}</span></p>
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}