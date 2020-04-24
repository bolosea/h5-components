import React from 'react'
import styled from 'styled-components'

const MeasureFooterContainer = styled.div`
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
const NormalBtn = styled(Btn)`
  width: 24vw;
  background: #fff;
  color: #ff9000;
  border: 0.26vw solid #ff9000;
`

class MeasureFooter extends React.Component{
  render() {
    return <MeasureFooterContainer>
      <NormalBtn>查看资料</NormalBtn>
      <NormalBtn>查看合同单</NormalBtn>
    </MeasureFooterContainer>
  }
}
export default MeasureFooter