import React, { Component } from "react";
import QRCode from "qrcode.react";
import * as Util from "../../util";
import "./index.less";
import Logo from "./imgs/logo.png";
import html2canvas from "html2canvas";

export default class ExtendLH extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qrUrl: "https://m.fs.bnq.com.cn/extendLH" + location.search
    };
  }

  componentDidMount() {
    setTimeout(() => {
      html2canvas(document.body,{
        dpi: window.devicePixelRatio * 2,
        scale: 2,
        width: document.documentElement.scrollWidth,
        height:  document.documentElement.scrollHeight,
      }).then(canvas => {
        // 【重要】关闭抗锯齿
        canvas.mozImageSmoothingEnabled = false;
        canvas.webkitImageSmoothingEnabled = false;
        canvas.msImageSmoothingEnabled = false;
        canvas.imageSmoothingEnabled = false;
        let img = new Image();
        img.src = canvas.toDataURL("image/png");
        document.body.innerHTML = ''
        document.body.appendChild(img);
      });
    }, 0);
  }

  render() {
    return (
      <div className="extend">
        <QRCode
          className="qrcode"
          imageSettings={{
            src: Logo,
            height: 60,
            width: 60
          }}
          level="M"
          value={this.state.qrUrl} //value参数为生成二维码的链接
          size={document.documentElement.scrollWidth / 2} //二维码的宽高尺寸
          fgColor="#f08300"
        >
          {" "}
          //二维码的颜色 >
        </QRCode>
        <p className="tip">长按识别二维码,开通牛匠到家</p>
      </div>
    );
  }
}
