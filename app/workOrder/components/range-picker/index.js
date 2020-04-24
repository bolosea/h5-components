
import React,{ useState, useEffect } from 'react'
import {DatePicker} from "../datepicker";
import './index.less'

/**
 *
 * @param onChange
 * @param timeNames 必填 timeNames: [startTime,endTime]...
 * @returns {*}
 * @constructor
 */
export function RangePicker({onChange,timeNames,isReset}){
	
	console.log(' RangePicker isReset',isReset)
	const [startTime, setStartTime] = useState(null)
	const [endTime, setEndTime] = useState(null)
	
	useEffect(()=>{
		if(startTime && endTime){
			onChange && onChange({
				[timeNames[0]]: startTime,
				[timeNames[1]]:endTime
			})
		}
	},[startTime,endTime])
	
	return <div className='range-picker'>
		<DatePicker isReset={isReset} onChange={(value)=>setStartTime(value)}/>
		<div className="split"/>
		<DatePicker isReset={isReset} onChange={(value)=>setEndTime(value)}/>
	</div>
}