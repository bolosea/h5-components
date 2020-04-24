import React from "react";
import "./index.less";
import CallImg from '@workOrder/imgs/call@3x.png'

export function Info({fields = [], data,title='详细信息'}) {
  
  fields = hasNext(fields)
  
  function hasNext(items,preIndex,original=items) {
    console.log(original,'original1')
    const next = hasSub(items,preIndex)
    if(next.hasNext){
      if(!data[next.item.id] || data[next.item.id]==='否'){
        return original.slice(0,next.index)
      }else{
        return hasNext(items.slice(next.index,items.length),next.index,original)
      }
    }
    return original
  }
  
  function hasSub(arr,preIndex = 0){
    const index = arr.findIndex(a=>a.isSub)
    return {
      hasNext: !!~index,
      index: ~index ? preIndex + index + 1: 0,
      item: !!~index ? arr[index] : null
    }
  }
  
  function getFieldsType(field,data){
    let joinData = field['joinData']
    if(joinData){
      switch (joinData['type']){
        case 'mobile':
          return <a className='phone' href={`tel:${data[field['joinData']['id']]}`}>
            {`${data[field['joinData']['id']]}`}
            <img src={CallImg} alt="call"/>
          </a>
        case 'custom':
          return joinData.content  
        default: 
          return <span>{`${data[field['joinData'][id]]}`}</span>
      }

    }
  }

  return (
    <div className="info">
      <h3 className="info-title">{title}</h3>
      {fields.map(field => {
        const key = field["id"]
        const value = data[field["id"]];
        return (
        <React.Fragment key={key}>
          <div  className='info-item'>
            <span>
              {[field["name"]]}: 
            </span>
            <span>
              {value ? value : ''}
              {getFieldsType(field,data)}
            </span>
          </div>
          <div className={field['underline']?'underline':''}/>
        </React.Fragment>
      );
      })}
    </div>
  );
}
Info.Log = function ({data,title='处理日志'}) {
  return (
    <div className="info">
      <h3 className="info-title">{title}</h3>
      {
        data && data.map(d=>{
          return (
            <div className="info-log-item" key={d.id}>
              <p><span className='item-name'>{d.userName}</span><span>{d.createTime}</span></p>
              <p>{d.operatorFunction} : {d.workOrderAttachmentsVOList ? '' : d.operatorContent}</p>
              {
                d.workOrderAttachmentsVOList && d.workOrderAttachmentsVOList.map(f=>{
                  return <a className='file' key={f.id} download={f.originalFileName} href={f.uploadPath + '?attname='+ f.originalFileName}>{f.originalFileName}</a>
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}