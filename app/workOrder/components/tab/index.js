import React, { useState, useEffect } from "react";
import "./index.less";
import ArrowUp from "@workOrder/imgs/icon-arrow-top@3x.png";
import ArrowDown from "@workOrder/imgs/icon-arrow-down@3x.png";
import Choose from "@workOrder/imgs/icon-choose@3x.png";
import { func } from "prop-types";

export default function Tab({ filters = [] ,callback}) {
  const [current, setCurrent] = useState(null); //当前点击的tab栏
  const [select, setSelect] = useState([]); //当前选择的item

  const [flag, setFlag] = useState(false); //用于判断是否收回tab数据

  //切换tab栏
  function changeTab(item) {
    setCurrent(item);
    setSelect([]);
    if (current === item) {
      setFlag(!flag);
      setCurrent(null);
    } else {
      setFlag(true);
    }
  }

  //勾选item
  function changeSelect(item) {
    if(select.includes(item)){
      setSelect([...(select.splice(select.findIndex(s=>s.id===item.id),1),select)])
    }else{
      setSelect([...select, item]);
    }
  }

  //确定
  function filter(){
    callback && callback({
      [current['code']]: select
    })
    setFlag(false)
  }
  function reset(){
    callback && callback({})
    setFlag(false)
    setCurrent(null)
    setSelect([])
  }
  return (
    <div className="tab">
      <div className="title">
        {filters &&
          filters.map(item => {
            return (
              <span
                className={item === current ? "current" : ""}
                onClick={() => changeTab(item)}
                key={item.id}
              >
                {item.name}
                <img
                  src={
                    current === item ? (flag ? ArrowUp : ArrowDown) : ArrowDown
                  }
                  alt="arrow"
                />

              </span>
            );
          })}
      </div>
      {flag && <div className="content">
        {
          current &&
          current["data"].map(item => {
            return (
              <p
                className="item"
                onClick={() => changeSelect(item)}
                key={item.id}
              >
                <span>{item.shopName || item.name}</span>
                {
                  select.includes(item)?<img src={Choose} alt="choose" />:''
                }
              </p>
            );
          })
        }
      </div>
      }
      {flag && current && (
        <div className="footer">
          <button onClick={()=>reset()}>重置</button>
          <button onClick={()=>filter()}>确定</button>
        </div>
      )}

    </div>
  );
}
