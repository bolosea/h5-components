import React, { Component, useState, useEffect, Fragment, version } from 'react'
import * as Util from '@util'
import http from '@workOrder/http'
import {
    getApplyDetail, //detail数据
    applyCmAudit, //CM审批,
    supplyAmountCal //填写金额后更新数据
} from '../api';
import { createForm } from 'rc-form';
import CloseImg from '@workOrder/imgs/icon-list-close@3x.png'
import WordImg from '@workOrder/imgs/icon-word@3x.png'
import Toast from "@/prompt/toast";
import { Modal as AntModal } from 'antd-mobile'
import { getCookie, getUrlArg } from "../../../../../util";
import { sessionToken } from '@workOrder/constant';
const alert = AntModal.alert


import Modal from "@workOrder/components/modal";
import StatusProgress from '../components/progress';

import './index.less'

import { detailData, moneyData, changedData } from './data';
import { object } from 'prop-types';

//detail- message
const DetailMessage = ({ fields, title, data, }) => (
    <div className="detail">
        {title && <h3 className="detail-title">{title}</h3>}

        {fields.map((field, index) => {
            const key = field["id"]
            const value = data[field["id"]];
            return (
                <React.Fragment key={index}>
                    <div className={title ? 'detail-item detail-message' : 'detail-item'}>
                        <span className={title ? 'message' : 'count-money'}>
                            {[field["name"]]}
                        </span>
                        {
                            field["mobile"] ? (
                                <span><a href={`tel:${value}`}>{value ? value : ''}</a></span>) : (
                                    <span>{value ? value : ''}</span>
                                )
                        }
                    </div>
                    <div className={field['underline'] ? 'underline' : ''} />
                </React.Fragment>
            );
        })}
    </div>
);

//money-message

const MoneyMessage = ({ fields, data, changedData, callBack }) => {
    //1.childlist
    const [detailList, setDetailList] = useState(undefined);
    //2.changed data to parent
    const [changdMoney, setChangedMoney] = useState([]);
    //3.money
    const [totalMoney, setTotalMoney] = useState({});
    const [orderId, setOrderId] = useState(null);
    // console.log(data.supplierCompensateAmount,'data',totalMoney.supplierCompensateAmount)

    useEffect(() => {
        if (!Object.keys(data).length) return;
        setDetailList(data.detailList);
        setTotalMoney(data);
        setOrderId(data.id);
    }, [data])

    //防抖
    function doBounce(fn, delay) {
        let timer = null;
        // console.log('ddd')
        return function (...args) {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fn();
            }, delay)
        }
    }

    //onchange - 改变输入框金额 - 更新childList
    function inputchanged(e) {
        let id = e.target.getAttribute('arial-id');
        // let reg = /^(([0-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/g;
        // e.target.value = e.target.value.match(reg)?e.target.value.match(reg)[0]: ''
        let value = e.target.value;
        const arr = [...detailList].map((item) => {
            if (item.id == id) {
                item.supplierCompensateAmount = value;
            }
            return item;
        });
        setDetailList(arr);
    }

    //处理请求参数 - supplyAmount
    function handelParams(array) {
        return array.map(({ id, supplierCompensateAmount, version }) => ({
            id,
            supplierCompensateAmount
        }))
    }

    function handelCallBack() {
        callBack({ 'detailList': detailList });
    }

    //onkeyup - 当输入框数完 - 发送请求获取最新的折让价格
    function inputkeyup() {
        let params = handelParams(detailList);
        // 2.输入框输入完 - 发送请求获取最新金额  data；
        async function post() {
            try {
                let res = await http.post(supplyAmountCal, {
                    id: orderId,
                    detailList: params
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (res) {
                    let result = {};
                    changedData.map(item => {
                        let id = `${item.id}`;
                        result[id] = res[id];
                        // error
                        // result = Object.assign(totalMoney, {
                        //     [id]: res[id]
                        // });                       
                    });
                    result = Object.assign({}, totalMoney, result)
                    // error test
                    // console.log(totalMoney.supplierCompensateAmount,'^^^^',result.supplierCompensateAmount)

                    setTotalMoney(result);
                    handelCallBack();
                }

            } catch (error) {
                console.log(error, 'wwwww')
            }
        };
        post();
        // this.props.callBack()


    }
    return (
        <div className="detail">

            {/* {console.log(detailList)} */}
            {/* 补差金额 各商品补差金额 - detailList*/}
            {/* {console.log(totalMoney,'totalMoney')} */}
            {
                detailList && detailList.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <div className="detail-supply">
                            <h2>供应商补差金额（品类: ${item.productName}）</h2>
                            <input type='number'
                                arial-id={item.id}
                                placeholder={'金额'}
                                value={item.supplierCompensateAmount}
                                onChange={(e) => { inputchanged(e) }}
                                onKeyUp={doBounce(inputkeyup, 500)}

                            />
                        </div>
                    </React.Fragment>
                ))
            }


            {/* 金额明细 */}
            {fields.map((field, index) => {
                const key = field["id"]
                const value = totalMoney[field["id"]];

                return (
                    <div key={index}>
                        <div className="detail-item">
                            <span className={field["black"] ? 'count-money black' : 'count-money'}>
                                {[field["name"]]}:
                        </span>
                            <span className={field["orange"] ? "orange" : ""}>{value && field["rate"] ? `${value}%` : value ? `¥ ${(Number(value)/100).toFixed(2)}` : 0}</span>

                        </div>
                        <div className={field['underline'] ? 'underline' : ''} />
                    </div>
                );
            })}

            {/* 查看明细 */}
            <div className="show-detail">
                <span>查看订单明细</span>
            </div>
        </div>
    )
}


// @createForm()
// class MoneyMessage extends React.Component {

//     render() {

//     }
// }

const FileMessage = ({ records, data, callBack }) => {
    const [fileList, setFileList] = useState([]);


    function addFile() {
        let fileEle = document.querySelector("#file");
        fileEle.click();
        
    }
    function removeFile(e, file) {
        setFileList(fileList.filter(f => f.name !== file.name))
    }

    function handleChange(e, flag) {
        let [file] = e.target.files;
        setFileList(fileList.concat([file]));
        callBack(fileList)
    }
    return (
        <Fragment>
            {/* 文件信息 */}
            <div className="file-list">
                {data.workOrderAttachmentsVOList && data.workOrderAttachmentsVOList.map(file => {
                    return (
                        <a className='file' key={file.id} download={file.originalFileName}
                            href={file.uploadPath + '?attname=' + file.originalFileName}>
                            <div className="img-wrap">
                                <img src={WordImg} alt="word" />
                            </div>
                            <span className='name'>{file.originalFileName}</span>
                        </a>
                    )
                })}
            </div>

            {/* 添加文件 */}
            <div className='add-file'>
                <h1>上传附件<span>（支持xcl/pdf/doc等格式）</span></h1>
                <div className="fileWraper">
                    <div className="file-item fake-file" onClick={() => addFile()}>
                        <span>+</span>
                    </div>
                    {
                        fileList && fileList.length > 0 ? fileList.map((fs, index) => (
                            <div key={index} className='file-item'>
                                <img src={WordImg} alt="word" />
                                <span>{fs.name}</span>
                                <img onClick={(e) => removeFile(e, fs)} src={CloseImg} alt="close" className='file-close' />
                            </div>)
                        )
                            :
                            ''
                    }
                    <input id='file' type='file' onChange={(e) => handleChange(e, 'file')} />
                </div>
            </div>
        </Fragment>
    )

}

const IdeaMessage = (({ records, callBack }) => {
    const [recordRemark, setRecordRemark] = useState('');
    return (
        < div className = "idea" >
            <h1 className="idea-title">审核意见:</h1>
            {
                records && records.map((record) =>
                    <div className='ops' key={record.id}>
                        <p>
                            <span>{record.optPosition} {record.preStatusName} : {record.optName}</span>
                            <span className='time'>{record.modifyTime}</span>
                            <span className='stataus'>{record.auditOpinionName}</span>
                        </p>
                        <p>{record.remark}</p>
                    </div>
                )
            }
            <textarea className='content' maxLength={2000} onChange={(e) => {
                e.persist();
                setRecordRemark(e.target.value);
                callBack({recordRemark})}}
                placeholder='请输入审核意见,不超过2000字'
                required="required"
                />
                
            </div >
        )   
})


export default function MarkDownDetailCmAudit() {
    let [detail, setDetail] = useState({}); //detail page data

    // let [roleType, setRoleType] = useState(''); //是否是申请人还是审批人
    let [allVisible, setAllVisible] = useState(false);
    let [callVisible, setCallVisible] = useState(false);

    let [recordRemark, setRecordRemark] = useState(null);//备注
    let [id, setId] = useState(null); //获取订单号;

    const [params, setParams] = useState({});
    const [files, setFiles] = useState([]);

    console.log(params, '+++++');
    //获取token
    useEffect(() => {
        let token = getUrlArg("TOKEN")
        let cookieToken = getCookie(sessionToken)
        if (token && cookieToken !== token) {
            document.cookie = `${sessionToken}=${token};path=/;domain=.bnq.com.cn`
        }
    }, [])

    useEffect(() => {
        //异步请求数据
        async function init() {
            if (!Object.keys(detail).length) {
                let id = Util.getUrlArg('id');
                let detail = await http.get(getApplyDetail + '?id=' + id);
                // console.log(detail);//delete
                setDetail(detail.map.all[0])//后台返回数据结构
                setId(detail.map.all[0])//获取订单号
            }
        }
        init();
    }, [detail])

    useEffect(() => {
        setParams({
            id: detail.id,
            "detailList": detail.detailList,
            recordRemark
        })
        // console.log(params,'111')
    }, [detail])

    //驳回 - cmafter 
    function refund() {
        let alertIns = alert('确认驳回', '确认要驳回这个费用审批单吗？', [
            {
                text: '取消', onPress: () => {
                    alertIns.close()
                }
            }, {
                text: '确认', onPress: async () => {
                    //post method
                    let postData = Object.assign({}, params, {
                        opinion: 2
                    });
                    let res = await http.post(refundApply, postData, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (res) {
                        Toast.show('操作成功!')
                        location.reload()
                    }
                    alertIns.close()
                }
            }
        ])

    }
    async function postHttp(args) {
        try{
            let formData = new FormData()
            //1.id
            formData.append('id',detail.id);
            //2.version
            formData.append(args[0],args[1])     
            //3.detaillist
    
            //4.file
            files.forEach(file=>formData.append('file',file));

            let res = await http.post(applyCmAudit, formData,{
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            });

            if(res){
                Toast.show(res)
                location.href = './markDownlist'
            }
        }catch(err) {
            console.log(err);
        }

       

        
        // Object.keys(params).map(k=>formData.append(k,params[k]))
        // Object.keys(params).map(k=>formData.append(k,JSON.stringify(params[k])))
        // files.forEach(file=>formData.append('file',file));
        // formData.append(args[0],args[1])

		// let res = await http.post(applyCmAudit, formData,{
        //     headers:{
		// 		"Content-Type": "multipart/form-data"
		// 	}
        // });
        // // location.href = './approvalList'
		// if(res){
		// 	Toast.show(res)
		// 	location.href = './approvalList'
		
    }
    function pass() {
        let alertIns = alert('确认通过', '确认要通过这个审批单吗？', [
            {
                text: '取消', 
                onPress: () => {
                    alertIns.close()
                }
            }, 
            {
                text: '确认',
                onPress: () => {
                    // alert('good');
                    postHttp(['opinion',1]);

                    // let res = await http.post(applyCmAudit, formData)
                    // if (res) {
                    //     Toast.show('操作成功!');
                    //     location.reload()
                    // }
                    // alertIns.close()
                }
            }
        ])

    }

    return <div className='markdown-cmdetail'>
        <h1>单号:{detail.workOrderCode}</h1>
        <div className="status">
            <p>
                <span>当前处理状态</span>
                <span className='showAll' onClick={() => setAllVisible(true)}>查看全部</span>
            </p>
            <p>{detail.nodeStatusName}</p>
            <p onClick={() => setCallVisible(true)}>联系方式</p>
        </div>

        <DetailMessage
            fields={detailData}
            data={detail}
            title="详细信息"
        />

        <MoneyMessage
            data={detail}
            fields={moneyData}
            id={id}
            changedData={changedData}
            //返回改变的参数值
            callBack={returnData => setParams({ ...params, ...returnData })}
        />
        <div className="apply-reason">
            <p>申请类型: {detail.appType}</p>
            <p>申请原因: {detail.applyReason}</p>
        </div>

        <FileMessage
            records={detail.records}
            data={detail}
            callBack={returnData => setFiles(returnData)}
        />

        <IdeaMessage
            records={detail.records}
            callBack={returnData => setParams({ ...params, ...returnData })}
        />

        {/* 输入框 */}
        <div className="op">
            <button onClick={() => refund()}>驳回</button>
            <button onClick={() => pass()}>通过</button>
        </div>

        <Modal title='全部审批流程' visible={allVisible} onClose={() => setAllVisible(false)}>
            {
                <StatusProgress flowMapList={detail["flowMaps"]} />
            }
        </Modal>

        <Modal title="联系CM" visible={callVisible} onClose={() => setCallVisible(false)}>
            {/* 遍历信息 */}
            {
                detail.concats ? detail.concats.map((people, index) => (
                    <p className='concat-modal' key={index}>
                        <span>{people.name}</span>
                        <span>联系方式： <a href={`tel:${people.mobile}`}>{people.mobile}</a></span>
                    </p>
                )) : <>无联系方式</>
            }
        </Modal>
    </div>
}
