import React,{Component, useState, useEffect} from 'react'
import { List, Checkbox} from 'antd-mobile'
const CheckboxItem = Checkbox.CheckboxItem;
import './index.less'

export default function Task({data = []}){
	
	return (
		<div className="task">
			{
				data.map(d=>{
					return (
						<List renderHeader={d.taskListName}>
							{d.workOrderTaskListDetailVOList && d.workOrderTaskListDetailVOList.map(detail => (
								<CheckboxItem disabled key={detail.id} checked={detail.ifHandle}>
									{detail.workOrderComplainDetailName}
								</CheckboxItem>
							))}
					</List>
					)
				})
			}
		</div>
	)
}