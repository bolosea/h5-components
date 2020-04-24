import React, {Component} from 'react'

import CloseImg from "@workOrder/imgs/icon-list-close@3x.png";
import WordImg from "@workOrder/imgs/icon-word@3x.png";
import './index.less'
import {MAX_UPLOAD_SIZE} from '@workOrder/constant'

export default class File extends Component{

  state = {
    fileList: [],
  };

  _handleChange = (e, flag) => {
    let [file] = e.target.files;
    if(file.size >= MAX_UPLOAD_SIZE){
      Toast.show('上传最大支持5M大小的文件!')
      return
    }
    this.setState({
      fileList: this.state.fileList.concat([file])
    },()=>{
      this.props.onChange && this.props.onChange(this.state.fileList)
    });
    
  };
  _addFile = () => {
    let fileEle = document.querySelector("#file");
    fileEle.click();
  };
  _removeFile = file => {
    this.setState({
      fileList: this.state.fileList.filter(fs => fs.name !== file.name)
    },()=>{
      this.props.onChange && this.props.onChange(this.state.fileList)
    });
  };

  render() {
    return (
      <div className="files">
          <div className="fileWraper">
            <div
              className="file-item fake-file"
              onClick={() => this._addFile()}
            >
              <span>+</span>
            </div>
            {this.state.fileList.length > 0
              ? this.state.fileList.map((fs, index) => (
                  <div key={index} className="file-item">
                    <img src={WordImg} alt="word" />
                    <span>{fs.name}</span>
                    <img
                      onClick={() => this._removeFile(fs)}
                      src={CloseImg}
                      alt="close"
                      className="file-close"
                    />
                  </div>
                ))
              : ""}
            <input
              id="file"
              type="file"
              onChange={e => this._handleChange(e, "file")}
            />
          </div>
        </div>
    )
  }
}