import React, { useState, useEffect, Fragment } from 'react'
// import * as Util from '@util'
import http from '@workOrder/http'
import {
    getApplyDetail, //detail数据
    applyCmAudit, //CM审批,
    supplyAmountCal, //填写金额后更新数据
    applyType
} from '../api';
// import { createForm } from 'rc-form';
import CloseImg from '@workOrder/imgs/icon-list-close@3x.png'
import WordImg from '@workOrder/imgs/icon-word@3x.png'
import Toast from "@/prompt/toast";
import { Modal as AntModal } from 'antd-mobile'
import {
    getCookie,
    // getUrlArg
} from "../../../../../util";
import { sessionToken } from '@workOrder/constant';
const alert = AntModal.alert


// import Modal from "@workOrder/components/modal";
import ApplyComponet from '../components/applyComponent';

import './index.less'

import { infoData, moneyData, changedData } from './data';
import * as CONSTANT from '@workOrder/constant';
import { getUrlArg } from "@util";

//detail- message
const InfoMessage = ({ fields, data }) => (
    <div className="info">
        {/* {title && <h3 className="detail-title">{title}</h3>} */}

        {fields.map((field, index) => {
            const key = field["id"]
            const value = data[field["id"]];
            return (
                <React.Fragment key={index}>
                    {
                        key == 'orderCode' ? (
                            <div className="info-order">
                                <p> {[field["name"]]}:</p>
                                <input 
                                    type="number" 
                                    // value={value}
                                    />
                            </div>
                        ) : (                                
                            <div className="info-message">
                                <span>
                                    {[field["name"]]}:
                                </span>
                                <span>{value}</span>                                    
                            </div>                                
                            )
                    }
                </React.Fragment>
            );
        })}
    </div>
);

const MoneyMessage = ({ fields, data, changedData, callBack }) => {
    //1.childlist
    // const [detailList, setDetailList] = useState(undefined);
    //2.changed data to parent
    const [changdMoney, setChangedMoney] = useState([]);
    //3.money
    const [totalMoney, setTotalMoney] = useState({});
    const [orderId, setOrderId] = useState(null);
    // console.log(data.supplierCompensateAmount,'data',totalMoney.supplierCompensateAmount)

    useEffect(() => {
        if (!Object.keys(data).length) return;
        // setDetailList(data.detailList);
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

    //处理请求参数 - supplyAmount
    function handelParams(array) {
        return array.map(({ id, supplierCompensateAmount, version }) => ({
            id,
            supplierCompensateAmount
        }))
    }

    return (
        <div className="info">
            {/* 金额明细 */}
            {fields.map((field, index) => {
                const key = field["id"]
                const value = totalMoney[field["id"]];

                return (
                    <React.Fragment key={index}>
                    {
                        key == 'applyDiscountAmount' ? (
                            <div className="info-money">
                                <p> {[field["name"]]}:</p>
                                <input 
                                    type="number" 
                                    // value={value}
                                    />
                            </div>
                        ) : (                                
                            <div className="info-message">
                                <span className={field["black"] ? 'black' : ''}>
                                    {[field["name"]]}:
                                </span>
                                <span className={field["orange"] ? "orange" : field["black"] ? "black" : ""}>
                                    {value && field["rate"] ? `${value}%` : value ? `¥ ${(Number(value) / 100).toFixed(2)}` : 0}
                                </span>                                  
                            </div>                                
                            )
                    }
                        <div className={field['underline'] ? 'underline' : ''} />
                    </React.Fragment>
                );
            })}

            {/* 查看明细 */}
            <div className="show-detail">
                <span>查看订单明细</span>
            </div>
        </div>
    )
}


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

export default function MarkDownDetailCmAudit() {
    const [detail, setDetail] = useState({}); //detail page data

    // let [roleType, setRoleType] = useState(''); //是否是申请人还是审批人
    // let [allVisible, setAllVisible] = useState(false);
    // let [callVisible, setCallVisible] = useState(false);

    const [recordRemark, setRecordRemark] = useState(null);//备注
    const [id, setId] = useState(null); //获取订单号;

    const [params, setParams] = useState({});
    const [files, setFiles] = useState([]);
    const [opVisible, setOpVisible] = useState(false)

    console.log(params, '+++++');

    //获取token
    useEffect(() => {
        let token = getUrlArg("TOKEN")
        let cookieToken = getCookie(sessionToken)
        if (token && cookieToken !== token) {
            document.cookie = `${sessionToken}=${token};path=/;domain=.bnq.com.cn`
        }
    }, [])

    //异步请求数据
    useEffect(() => {
        const id = getUrlArg("id");
        if (id) {
            init(id);
        }

        async function init(id) {
            let res = await http.get(getApplyDetail + "?id=" + id);

            if (res) {
                let d = res.map.all[0]
                setDetail(d);
                sessionStorage.setItem(CONSTANT.markdownDetail, JSON.stringify(d))
            }
        }
        // //异步请求数据
        // async function init() {
        //     if (!Object.keys(detail).length) {
        //         let id = Util.getUrlArg('id');
        //         let detail = await http.get(getApplyDetail + '?id=' + id);
        //         // console.log(detail);//delete
        //         setDetail(detail.map.all[0])//后台返回数据结构
        //         setId(detail.map.all[0])//获取订单号
        //     }
        // }
        // init();
    }, [])

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
        try {
            let formData = new FormData()
            //1.id
            formData.append('id', detail.id);
            //2.version
            formData.append(args[0], args[1])
            //3.detaillist

            //4.file
            files.forEach(file => formData.append('file', file));

            let res = await http.post(applyCmAudit, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res) {
                Toast.show(res)
                location.href = './markDownlist'
            }
        } catch (err) {
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
                    postHttp(['opinion', 1]);

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

    return <div className='markdown-applydetail'>
        <InfoMessage
            fields={infoData}
            data={detail}
        />

        <MoneyMessage
            data={detail}
            fields={moneyData}
            id={id}
            changedData={changedData}
            //返回改变的参数值
            callBack={returnData => setParams({ ...params, ...returnData })}
        />

        <div className="form">
            {/* 申请类型 */}
            <ApplyComponet 
                data={["材料","好","可以"]}
                title={"申请类型"}
            />
           

            {/* 申请原因 */}
            < div className="apply-reason" >
                <p>申请原因</p>
                <textarea className='content' maxLength={2000} onChange={(e) => {
                    e.persist();
                    setRecordRemark(e.target.value);
                }}
                    placeholder='请输入申请原因,不超过2000字'
                    required="required"
                />
            </div >
            {/* 上传附件 */}
            <FileMessage
                records={detail.records}
                data={detail}
                callBack={returnData => setFiles(returnData)}
            />
        </div>

        <div className="op-btn" onClick={() => setOpVisible(true)}>
			提交
		</div>

    </div>
}
