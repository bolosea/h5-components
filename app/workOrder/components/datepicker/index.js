import React, { useState, useEffect, useRef, } from 'react'
import './index.less'



function formatDate(timestamp){
  let date = new Date(timestamp)
  let year = date.getFullYear()
  let month = date.getMonth()+1
  let day = date.getDate()
  return {
    year,
    month,
    day
  }
}



export function DatePicker({onChange, isReset = false}){
  console.log('datepicker isreset ',isReset)
  let timeNow = formatDate(Date.now())
  let [time, setTime] = useState('')
  let [currentYear,setCurrentYear] = useState(null) //选中的年
  let [currentMonth,setCurrentMonth] = useState(null) //选中的年
  let [currentDay,setCurrentDay] = useState(null) //选中的日
  let [showPicker,setShowPicker] = useState(false)
  
  const [pos, setPos] = useState(0) //滑动的距离
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0) //年份结束滑动时候的位置
  const [monthEnd, setMonthEnd] = useState(0)//月份结束滑动时候的位置
  const [dayEnd, setDayEnd] = useState(0)//月份结束滑动时候的位置
  const yearRef = useRef(null)
  const monthRef = useRef(null)
  const dayRef = useRef(null)
  
  let [maxPos, setMaxPos] = useState({
    year: 0,
    month: 0,
    day: 0
  }) // 元素可以滑到的最大距离
  let [spanYearEles, setSpanYearEles] = useState([])
  let [spanMonthEles, setSpanMonthEles] = useState([])
  let [spanDayEles, setSpanDayEles] = useState([])
  
  useEffect(()=>{
    if(isReset){
      setTime('')
    }
  },[isReset])

  let daysTemp = [
    '1',  '2',  '3',  '4',  '5',  '6',
    '7',  '8',  '9',  '10', '11', '12',
    '13', '14', '15', '16', '17', '18',
    '19', '20', '21', '22', '23', '24',
    '25', '26', '27', '28', '29', '30',
    '31'
  ]
  let [days, setDays] = useState(daysTemp)
  let years = [
    '2000', '2001', '2002', '2003',
    '2004', '2005', '2006', '2007',
    '2008', '2009', '2010', '2011',
    '2012', '2013', '2014', '2015',
    '2016', '2017', '2018', '2019',
    '2020', '2021', '2022', '2023',
    '2024', '2025', '2026', '2027',
    '2028', '2029', '2030'
  ]
  let months = [1,2,3,4,5,6,7,8,9,10,11,12]
  //初始化数据
  function initSpans(ref,setFn,flag){
    let eles = ref && ref.current && ref.current.children
    eles && Array.from(eles).forEach((span,index)=>{
      const top = span.offsetHeight * index
      span.style.top = top + 'px'
      if(index === eles.length -1 ){
        setMaxPos((maxpos)=>{
          return {
            ...maxpos,
            [flag]: top
          }
        })
      }
    })
    setFn(eles)
  }
  //初始化元素位置
  useEffect(()=>{
    if(showPicker){
      initSpans(yearRef,setSpanYearEles,'year')
      initSpans(monthRef,setSpanMonthEles,'month')
      initSpans(dayRef,setSpanDayEles,'day')
    }
  },[showPicker])
  
  //初始化日期
  useEffect(()=>{
    function initDate(ref,flag,arr,setCurrentFn,setEndFn){
      let current = timeNow[flag]
      let index = arr.findIndex(a=>a==current)
      //同步设置
      // setCurrentFn(arr[index])
      let endPos = -(index*45-45)
      setEndFn(endPos)
      ref.current.style.transform = `translate(0,${endPos}px)`
    }
    if(showPicker){
      initDate(yearRef,'year',years,setCurrentYear,setEnd)
      initDate(monthRef,'month',months,setCurrentMonth,setMonthEnd)
      initDate(dayRef,'day',days,setCurrentDay,setDayEnd)
    }
    
  },[showPicker])
  //当days变化的时候
  useEffect(()=>{
    if(showPicker){
      initSpans(dayRef,setSpanDayEles,'day')
      //当days数组变化的时候 如果当前上滑到了顶部 需要重新计算高度
      let transformStr  = dayRef.current.style.transform
      let y = parseInt(transformStr.split(',')[1])
      let max = days.length * 45 - 45
      if(Math.abs(y)>=max){
        dayRef.current.style.transform = `translate(0,${-(max-45)}px)`
        //需要将当前选中的天修改成最后一个
        setCurrentDay(spanDayEles[spanDayEles.length-1])
      }
    }
  },[days])
  //当月份改变的时候 判断该月多少天
  const had31 = [1,3,5,7,8,10,12]
  const had30 = [4,6,9,11]
  useEffect(()=>{
    function hadDay(){
      let month = +(currentMonth['innerText'])//靠 这个获取到的是字符串
      let hd = had31.includes(month) ? 31 : (had30.includes(month) ? 30 : 28)
      if(hd === 28){
        let temp = [...daysTemp]
        let year = +(currentYear['innerText'])
        if(year % 100===0 && year%400 === 0 ){
          //闰年
          temp = temp.slice(0,-2)
        }else if(year % 4 === 0){
          //闰年
          temp = temp.slice(0,-2)
        }else{
          //平年
          temp = temp.slice(0,-3)
        }
        setDays(temp)
      }else if(hd === 30){
        setDays(([...daysTemp].slice(0,-1)))
      }else{
        setDays(([...daysTemp].slice(0)))
      }
    }
    if(currentMonth && currentYear){
      hadDay()
    }
  },[currentMonth,currentYear])
  
  //根据元素遍历选中的
  function select(eles,end,ref,setEndFn,setCurrentFn,flag){
    let curr = null //这里使用这个的目的是每次选择完后 马上使用当前的current矫正位置
    for(let i = 0;i<eles.length;i++){
      let top = parseInt(eles[i].style.top)
      //这边通过观察 当前后大于一个阈值的时候 页面上显示就已经是另一个元素了
      //这个阈值大约等于分割线高度的1.5倍 这边分割线是45 所以是30
      let prev = top - 30
      let next = top + 30
      //往上滑的情况
      //这个+45是因为刻度线高度是45-90而不是0-45
      //如果结束的距离大于该元素的前置并且小于超出的距离即选中
      if(-end+45>=prev && -end+45<=next){
        setCurrentFn(eles[i])
        curr = eles[i]
        break
      }else if(-end + 45 <=0){
        //往下滑
        //小于0 说明已经滑出了天际
        setCurrentFn(eles[0])
        curr = eles[0]
        break
      }else if(-end>= maxPos[flag]){
        setCurrentFn(eles[eles.length-1])
        curr = eles[eles.length-1]
      }
    }
    //矫正位置 让选中元素居中
    let top = parseInt(curr.style.top)
    let dis = -(top-45)
    ref.current.style.transform = `translate(0,${dis}px)`
    // yearRef.current.style.transition = 'transform 1s' 这行代码莫名其妙的就实现了轻轻滑动的效果。。
    //这里必须把end设置成矫正后的
    setEndFn(dis)
  }
  //当end变化时 计算选中的元素
  useEffect(()=>{
    if(spanYearEles.length){
      select(Array.from(spanYearEles),end,yearRef,setEnd,setCurrentYear,'year')
    }
  },[end])
  //当monthend变化时 计算选中的元素
  useEffect(()=>{
    if(spanMonthEles.length){
      select(Array.from(spanMonthEles),monthEnd,monthRef,setMonthEnd,setCurrentMonth,'month')
    }
  },[monthEnd])
  //当dayend变化时 计算选中的元素
  useEffect(()=>{
    if(spanDayEles.length){
      select(Array.from(spanDayEles),dayEnd,dayRef,setDayEnd,setCurrentDay,'day')
    }
  },[dayEnd])

  function touchStart(e){
    setStart(e.changedTouches[0]['clientY'])
  }
  function touchEnd(e){
    setEnd(end=>pos+end)
  }
  function touchMove(e){
    let pos = e.changedTouches[0]['clientY'] - start
    yearRef.current.style.transform = 'translate(0,'+(pos+end)+'px)'
    setPos(pos)
  }
  
  function touchMonthsEnd(e){
    setMonthEnd(monthEnd=>pos+monthEnd)
  }
  function touchMonthsMove(e){
    let pos = e.changedTouches[0]['clientY'] - start
    monthRef.current.style.transform = 'translate(0,'+(pos+monthEnd)+'px)'
    setPos(pos)
  }

  function touchDaysEnd(e){
    setDayEnd(dayEnd=>pos+dayEnd)
  }
  function touchDaysMove(e){
    let pos = e.changedTouches[0]['clientY'] - start
    dayRef.current.style.transform = 'translate(0,'+(pos+dayEnd)+'px)'
    setPos(pos)
  }

  function confirm(){
    let yearStr = currentYear.innerText
    let monthStr = currentMonth.innerText
    let dayStr = currentDay.innerText
    const formatTime = `${yearStr}-${monthStr}-${dayStr}`
    setTime(formatTime)
    onChange && onChange(formatTime)
    setShowPicker(false)
  }
  
  
  return (
    <div className='bl-date-picker'>
      <span className='time-span' onClick={()=>setShowPicker((showPicker)=>!showPicker)}>{time}</span>
      {showPicker && <div className="selector">
        <div className="title">选择日期</div>
        <div className="content">
          <div className="years item" ref={yearRef} onTouchStart={(e)=>{
            touchStart(e)
          }} onTouchMove={(e)=>touchMove(e)} onTouchEnd={(e)=>touchEnd(e)}>
            {years.map(year=><p key={year}>{year}</p>)}
          </div>
          <div className="months item" ref={monthRef} onTouchStart={(e)=>touchStart(e)} onTouchMove={(e)=>touchMonthsMove(e)} onTouchEnd={(e)=>touchMonthsEnd(e)}>
            {months.map(month=><p key={month}>{month}</p>)}
          </div>
          <div className="days item" ref={dayRef} onTouchStart={(e)=>touchStart(e)} onTouchMove={(e)=>touchDaysMove(e)} onTouchEnd={(e)=>touchDaysEnd(e)}>
            {days.map(day=><p key={day}>{day}</p>)}
          </div>
        </div>
        <div className="datepicker-footer">
          <button onClick={()=>setShowPicker(false)}>取消</button>
          <button onClick={()=>confirm()}>确定</button>
        </div>
      </div>
      }
    </div>
  )
}