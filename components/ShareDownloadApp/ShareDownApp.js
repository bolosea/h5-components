import React, { PureComponent } from 'react'
import './ShareDownApp.css'
import imgLogo from './images/downapp.png'
import imgLogo2 from './images/downapptip.jpg'

class ShareDownApp extends PureComponent {
  render () {
    return (
      <div className='shareDown_content'>
        <div className='down_wrap'>
          <div className='imgLogo'><img src={!this.props.showImgLogo2?imgLogo:imgLogo2} /></div>
          <div>
            <a href='https://a.app.qq.com/o/simple.jsp?pkgname=com.baianju.yonghu' className='shareDown_btn'>立即下载</a>
          </div>
        </div>
      </div>
    )
  }
}
export default ShareDownApp
