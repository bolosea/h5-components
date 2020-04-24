import React, { Component } from "react";
import { createForm } from "rc-form";
import http from "@workOrder/http";
import Toast from "@/prompt/toast";
import "./index.less";
import { Modal,Switch,List } from "antd-mobile";
const alert = Modal.alert;
import File from '@workOrder/components/file'
import Radio from '@workOrder/components/radio'
import {Select} from '@workOrder/components/select'
import {DatePicker} from '@workOrder/components/datepicker'
import {RangePicker} from "../range-picker";



@createForm()
export default class AddComplaintDetail extends Component {
  state = {
    params: {}
  };

  

  //新增
  _add = () => {
    alert("确认创建", "是否确认创建?", [
      {
        text: "取消",
        onPress: () => {}
      },
      {
        text: "确认",
        onPress: () => {
          this.props.form.validateFields((error, values) => {
            if (error) {
            console.log('error: ', error);

              return;
            }
            console.log('values',values)
            this.props.addNew && this.props.addNew(values)
          });
        }
      }
    ]);
  };

  

  _getItem = option => {

    switch (option.type) {
      case "select":
        return <Select isReset={option.isReset} getRealValue={option.getRealValue} data={option.data} title={option.title || option.name} customKey={option.customKey} itemName={option.itemName} subItemName={option.subItemName} showSubType={option.showSubType} selectedCallback={option.selectedCallback}/>;
      case 'file':
        return <File/>  
      case 'radio':
        return <Radio data={option.data}/>
      case 'textarea':
        return <textarea/>
      case 'switch':
        return <Switch/>
      case 'time':
        return <DatePicker/>
      case 'rangepicker':
        return <RangePicker isReset={option.isReset} timeNames={option.timeNames || ['start','end']}/>
      default:
        return <input onBlur={option.onBlur && option.onBlur.bind(null,...[`${option.id}`])} onChange={option.onChange && option.onChange.bind(null,...[`${option.id}`])}/>;
    }
  };
  
  _renderFields = () => {
    let { data, form: {getFieldDecorator,getFieldError,getFieldProps} } = this.props;
    return (
      data &&
      data.map(d => {
        const options = {
          rules: [
            {
              required: d.required || false,
              message: `${d["name"]}不能为空!`
            }
          ],
          initialValue: d.initialValue || '',
          valuePropName: d['type'] == 'switch' ? 'checked' : 'value',
        };
        let errors;
        return (
          <div className={d.hide ? 'new-item hide': 'new-item'} key={d.id}>
            {d['type'] === 'select' ? '' : <h1>{d.name}</h1>}
            {
              //这边这个switch单独使用getFieldProps方式 是因为不用这个 会报`getFieldDecorator` will override `checked`, so please don't set `checked`错误
              d['type'] === 'switch'? <Switch onClick={d.onClick}
               {...getFieldProps(d.id,{
                ...options
              })}/> : getFieldDecorator(`${d.id}`, {
              ...options
            })(this._getItem(d))
            
            }
            <span className="error">
            {(errors = getFieldError(`${d.id}`)) ? errors.join(",") : null}
            </span>
          </div>
        );
      })
    );
  };

  render() {
    return (
      <div className="new">
        {
          this._renderFields()
        }
        
        {this.props.customActions ? this.props.customActions(this.props.form): <button className="add-btn" onClick={() => this._add()}>
          提交
        </button> }
       
      </div>
    );
  }
}


