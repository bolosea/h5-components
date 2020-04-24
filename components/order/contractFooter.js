import React from 'react'
import styled from 'styled-components'

const ContractFooterContainer = styled.div`
  width: 100%;
  height: 17.33vw;
  background: #FFFFFF;
  box-shadow: inset 0 0.26vw 0 0 #DFDFDF;
  padding: 4vw;
  box-sizing: border-box;
  font-size: 4vw;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
`
const Btn = styled.div`
  height: 9.33vw;
  border-radius: 1.07vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2.67vw;
`
const TalkOnLine = styled(Btn)`
  width: 24vw;
  background: #ff9000;
  color: #fff;
`
const SeeProgress = styled(Btn)`
  width: 24vw;
  background: #fff;
  color: #ff9000;
  border: 0.26vw solid #ff9000;
`
const More = styled(Btn)`
  width: 20vw;
  background: #fff;
  color: #333;
  border: 0.26vw solid #ccc;
`

class ContractFooter extends React.Component{
  render() {
    return <ContractFooterContainer>
      <More>更多</More>
      <SeeProgress>查看进度</SeeProgress>
      <TalkOnLine>在线沟通</TalkOnLine>
    </ContractFooterContainer>
  }
}
export default ContractFooter