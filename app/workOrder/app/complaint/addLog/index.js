import React,{Component, useState} from 'react'
import './index.less'
import {getUrlArg} from "../../../../../util";
import File from '@workOrder/components/file'
import {addComplaintLog} from '../api'
import http from '@workOrder/http'
import Toast from "../../../../../components/prompt/toast";

export default function AddComplaintLog(){
	const [file, setFile] = useState([])
	const [operatorContent, setOperatorContent] = useState('')
	const [disable,setDisable] = useState(false)
	const id = getUrlArg('id')
	
	async function submit(){
		setDisable(true)
		const data = new FormData()
		file.forEach(f=>{
			data.append('file',f)
		})
		data.append('operatorContent',operatorContent)
		data.append('unionId',id)
		
		console.log(file,operatorContent,id)
		const res = await http.post(addComplaintLog,data,{
			headers:{
				"Content-Type": "multipart/form-data"
			}})
		if(res === '创建成功！'){
			location.href = `./complaintDetail?id=${id}`
		}
		setDisable(false)
	}
	return (
		<div className='add-complaint-log'>
			<textarea onChange={(e)=>setOperatorContent(e.target.value)}/>
			<File onChange={(f)=>setFile(f)}/>
			<button disabled={disable} onClick={()=>submit()}>提交</button>
		</div>
	)
}