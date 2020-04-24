import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import truePng from './assets/true.png'

const Content = styled.div`
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: calc(100vh - 17.33vw);
  overflow: auto;
`
const OrderContent = styled.div`
  background: #f7f7f7;
  min-height: 100vh;
  & .rc-table-thead {
    margin-top: 4vw;
    background: #F0F6FA;
    font-size: 3.73vw;
    color: #333;
    & tr {
      height: 12vw;
      line-height: 12vw;
      th {
        font-weight: 400;
      }
    }
  }
  & .rc-table-row{
    height: 12vw;
    line-height: 12vw;
    color: #999;
    font-weight: 200;
    position: relative;
  }
`;
const OrederHeaderStatusContent = styled.div`
  width: 100%;
  height: 12vw;
  display: flex;
  background: ${(props) => props.bgc};
  justify-content: space-between;
  align-items: center;
  padding-left: 4vw;
  padding-right: 4vw;
  box-sizing: border-box;
`
const OrderNumber = styled.span`
  font-size: 3.73vw;
  color: #333;
`
const OrderStatusText = styled.span`
  font-size: 4vw;
  color: #333;
  font-weight: 700;
`
const OrderStatusContainer = styled.div`
  width: 100%;
  height: 28.53vw;
  padding: 4vw;
  box-sizing: border-box;
  color: #fff;
  background-image: linear-gradient(270deg, #FFA650 0%, #FA7B00 71%);
  & .order_status {
    font-size: 3.73vw;
  }
  & span{
    font-size: 3.73vw;
    margin-bottom: 2.67vw;
  }
  & .DOING{
    font-size: 4vw;
  }
`
const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3.06vw;
  & >div:last-child > div::after{
    display: none!important;
  }
`
const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const DoneIcon = styled.div`
  width: 5.33vw;
  height: 5.33vw;
  background: #fff;
  color: #FA7B00;
  border-radius: 6.33vw
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  & img{
    display: flex;
    width: 3.2vw;
  }
  &::after{
    content: ' ';
    position: absolute;
    width: 23vw;
    height: 0.5vw;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 5.33vw;
    background: #fff;
  }
`
const DoingIcon = styled.div`
  width: 5.33vw;
  height: 5.33vw;
  background: rgba(255, 255, 255, .5);
  border-radius: 6.33vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  & div {
    width: 3.2vw;
    height: 3.2vw;
    border-radius: 4vw;
    background: #fff;
  }
  &::after{
    content: '······································';
    position: absolute;
    width: 24vw;
    height: 1vw;
    font-size: 8vw;
    overflow: hidden;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 5.33vw;
    display: flex;
    align-items: center;
  }
`
const TodoIcon = styled.div`
  width: 5.33vw;
  height: 5.33vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  & div {
    width: 3.2vw;
    height: 3.2vw;
    border: 2px solid #fff;
    border-radius: 3.2vw;
  }
  &::after{
    content: '······································';
    position: absolute;
    width: 24vw;
    height: 1vw;
    font-size: 8vw;
    overflow: hidden;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 5.33vw;
    display: flex;
    align-items: center;
  }
`
const InfoCard = styled.div`
  background: #fff;
  margin-bottom: 2.67vw;
  padding: 4vw;
  font-size: 4vw;
`
const CardTitleDiv = styled.div`
  padding-left: 4vw;
  height: 4vw;
  position: relative;
  line-height: 4vw;
  &::before {
    content: ' ';
    width:0.67vw;
    height: 4vw;
    background: #ff9000;
    position: absolute;
    left: 0;
    bottom: 0;
  }
`
const ContentBlockItem = styled.div`
  border-top: 0.27vw solid #dfdfdf;
  margin-top: 4vw;
`
const ItemText = styled.div`
  font-size: 3.73vw;
  margin-top: 3vw;
  color: #999;
  font-weight: 200;
  display: flex;
  & span:first-child{
    padding-left: 4vw;
    display: flex;
    align-items: center;
    width: 35vw;
  }
`
const Ticket = styled.div`
  box-sizing: border-box;
  font-size: 3.73vw;
`
const TicketItem = styled.div`
  display: flex;
  line-height: 8vw;
  justify-content: space-between;
  color: #999;
  font-weight: 200;
`
const TicketPay = styled.div`
  border-top: 0.27vw solid #dfdfdf;
  padding-top: 2vw;
  margin-top: 2vw;
`
const TicketPayItem = styled.div`
  display: flex;
  line-height: 8vw;
  justify-content: space-between;
  color: #333;
  font-weight: 200;
  & span:last-child {
    font-size: 4.53vw;
    color: #ff9000;
    font-weight: 600;
  }
`
const BasicInfoItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const TelBtn = styled.div`
  width: 8vw;
  height: 8vw;
  border-radius: 8vw;
  border: 0.27vw solid #ff9000;
  padding: 1.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 4vw;
  & img{
    width: 5vw;
  }
`
const OperBtn = styled.div`
  width: 24vw;
  height: 7.2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.07vw;
  border: 1px solid #ff9000;
  color: #ff9000;
  margin-left: 8vw;
`
// 渲染状态下面的icon按钮
function StatusIcon(props) {
  if (props.flag === 'DONE'){
    return <DoneIcon>
      <img alt="完成" title="完成" src={truePng}/>
    </DoneIcon>
  } else if (props.flag === 'DOING') {
    return <DoingIcon>
      <div></div>
    </DoingIcon>
  } else if (props.flag === 'TODO') {
    return <TodoIcon>
      <div></div>
    </TodoIcon>
  } else {
    return null
  }
}

function CardTitle(props) {
  return <CardTitleDiv style={props.noPadding ? {margin: '4vw', paddingTop: '4vw', boxSizing: 'content-box'} : {}}>{props.title}</CardTitleDiv>
}

// 合同单的头部状态
class ContractOrederHeaderStatus extends React.Component{
  constructor(props){
    super(props)
  }
  
  getStatusMap(status) {
    switch(status) {
      case 1: return '待发货';
      default: return '默认状态';
    }
  }
  render() {
    return <OrederHeaderStatusContent bgc={'#fff'}>
      <OrderNumber>
        合同单号: {get(this.props, 'orderDetail.orderNum' , '')}
      </OrderNumber>
      <OrderStatusText>{this.getStatusMap(get(this.props, 'orderDetail.status', undefined))}</OrderStatusText>
    </OrederHeaderStatusContent>
  }
}

// 测量单的头部状态
class MeasureOrederHeaderStatus extends React.Component{
  constructor(props){
    super(props)
  }
  
  getStatusMap(status) {
    switch(status) {
      case 1: return '待发货';
      default: return '默认状态';
    }
  }
  render() {
    return <OrederHeaderStatusContent bgc={'#ddf2ff'}>
      <OrderNumber>
        合同单号: {get(this.props, 'orderDetail.orderNum' , '')}
      </OrderNumber>
      <OrderStatusText>{this.getStatusMap(get(this.props, 'orderDetail.status', undefined))}</OrderStatusText>
    </OrederHeaderStatusContent>
  }
}

// 订单的完成进度组件
class OrderStatusComp extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      statusList: [
        {
          text: '生产',
          id: 1
        },
        {
          text: '配送',
          id: 2
        },
        {
          text: '安装',
          id: 3
        },
        {
          text: '完成',
          id: 4
        }
      ]
    }
  }
  componentDidMount() {
    const status = this.props.status
    this.setState({
      statusList: this.state.statusList.map((item, index) => {
        if (index < status) {
          item.flag = 'DONE'
        } else if (index === status) {
          item.flag = 'DOING'
        } else if (index > status) {
          item.flag = 'TODO'
        }
        return item
      })
    })
  }

  statusItem(item) {
    return <StatusItem key={item.id}>
      <span className={item.flag}>{item.text}</span>
      <StatusIcon flag={item.flag}/>
    </StatusItem>
  }

  render() {
    return <OrderStatusContainer style={this.props.style}>
      <p className="order_status">订单动态</p>
      <ProgressBar >
        {this.state.statusList.map((item) => {
          return this.statusItem(item)
        })}
      </ProgressBar>
    </OrderStatusContainer>
  }
}
/*
  接收props{
    showHeader: boolean; 是否展示header
    title?: string; header的文字
    noPadding?: boolean padding设置么
  }
*/
class OrderCard extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return <InfoCard style={this.props.noPadding ? {padding: 0} : {}}>
      {get(this.props, 'showHeader', false) ? <CardTitle {...this.props} title={get(this.props, 'title', '')} /> : null}
      {this.props.children}
    </InfoCard>
  }
}

/* 
  props{
    blockData: {key: string, value: string | ReactNode}
  }
*/
class ContentBlock extends React.Component{
  constructor(props){
    super(props)
  }
  render() {
    const blockData = get(this.props, 'blockData', [])
    return <React.Fragment>
      {blockData.map((item, index) => {
        return <ContentBlockItem key={index}>
          {item.map((info, num) => {
            return <ItemText key={num}>
              <span>{info.key}:</span>
              {typeof get(info, 'value', '-') === 'string' ? <span>{get(info, 'value', '-')}</span> : get(info, 'value')()}
            </ItemText>
          })}
        </ContentBlockItem>
      })}
    </React.Fragment>
  }
}

class OrderTicket extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    const billInfo = this.props.ticketArr || {}
    return <Ticket>
      <TicketItem>
        <span>商品金额</span>
        <span>￥{billInfo.total}</span>
      </TicketItem>
      {get(billInfo, 'bargins', []).map((item, index) => {
        return <TicketItem key={index}>
          <span>{item.title}</span>
          <span>-￥{item.amount}</span>
        </TicketItem>
      })}
      <TicketPay>
        <TicketPayItem>
          <span>订单金额</span>
          <span>￥{billInfo.orderAmount}</span>
        </TicketPayItem>
        <TicketPayItem>
          <span>实付金额</span>
          <span>￥{billInfo.payAmount}</span>
        </TicketPayItem>
      </TicketPay>
    </Ticket>
  }
}


export {
  TelBtn,
  OrderContent,
  BasicInfoItem,
  ContractOrederHeaderStatus,
  MeasureOrederHeaderStatus,
  OrderStatusComp,
  OrderCard,
  TicketItem,
  ContentBlock,
  OrderTicket,
  Content,
  OperBtn
}