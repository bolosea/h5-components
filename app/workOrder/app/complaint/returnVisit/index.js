import React,{useState,useEffect} from 'react'
import {createForm} from 'rc-form'
import New from '@workOrder/components/new'
import {newData} from './data'
import './index.less'
import {getUrlArg} from '@util'
import {returnVisit} from "../api";
import http from '@workOrder/http'

function ReturnVisit(){
	const [id, setId] = useState(()=>{
		const urlId = getUrlArg("id");
		return urlId
	})
	let version = getUrlArg('version') || ''
	
	async function addNew(values) {
		Object.keys(values).forEach(k=>{
			if(typeof values[k] === "boolean"){
				values[k] = +values[k]
			}
		})
		let res = await http.post(returnVisit,{
			id,
			version,
			...values
		})
		setTimeout(()=>{
			history.back(-1)
		},1000)
	}
	return (
		<div className='return-visit'>
			<h1 className={'title'}>回访</h1>
			<New data={newData} addNew={addNew}/>
		</div>
	)
}
export default createForm()(ReturnVisit)