import React, { Component } from 'react';
import { createForm } from 'rc-form';
import ArrowUp from "@workOrder/imgs/icon-arrow-top@3x.png";
import ArrowDown from "@workOrder/imgs/icon-arrow-down@3x.png";
import Choose from "@workOrder/imgs/icon-choose@3x.png";

import "./index.less";

@createForm()
export default class ApplyComponent extends Component {

    state = {
        selected: '',//选中的applyType
        opVisible: false
    }

    componentDidMount() {
        const { data } = this.props;
        this.setState({
            selected: data[0]//先默认是第一个元素
        })
    }

    render() {
        // let errors;
        // const { getFieldProps, getFieldError } = this.props.form;
        const { data, title } = this.props;
        const { opVisible, selected } = this.state;
        return <div className='apply-component'>
            <div className="apply-select"
                onClick={() => {
                    this.setState({
                        opVisible: true
                    })
                }}
            >
                <span>{selected}</span>
                <img src={opVisible ? ArrowUp : ArrowDown} alt="arrow" />
            </div>
            {/* 下弹莫泰框 */}
            {
                opVisible && (
                    <div className="op-modal">
                        <div className="op-modal-wrapper">
                            <div className="content"
                            >
                                <p>申请类型</p>
                                {
                                    data.map((item, index) => (
                                        <p key={index}
                                            onClick={
                                                () => {
                                                    this.setState({
                                                        selected: item
                                                    })
                                                }
                                            }
                                        >
                                            <span>{item}</span>
                                            {
                                                item === selected && <img src={Choose} alt="choose" />
                                            }
                                        </p>
                                    ))
                                }
                                {/* <p onClick={()=>location.href = './addComplaintLog?id=' + detail.id}>添加留言日志</p> */}
                                {/* <p className='cancel' onClick={()=>{
                            this.setState({
                                opVisible: false
                            })
                        }}>取消</p> */}
                            </div>

                            <div className="footer">
                                <button onClick={() => { }}>取消</button>
                                <button onClick={() => { }}>确定</button>
                            </div>
                        </div>
                    </div>)
            }
        </div>
    }
}