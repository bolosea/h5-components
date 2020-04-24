import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Loader from './components/loader'
const Home  = lazy(()=>import( './app/home/index'))
const Preview  = lazy(()=>import( './app/preview/index'));
const Question1  = lazy(()=>import( './app/question/index'));
const Project  = lazy(()=>import( './app/project/index'));
const SurveySheet  = lazy(()=>import( './app/survey/index'));
const ContractOrderDetail  = lazy(()=>import( './app/order/contract/ContractOrderDetail'));
const MeasureOrderDetail  = lazy(()=>import( './app/order/measure/MeasureOrderDetail'));
const NewActivity  = lazy(()=>import( './app/activity'))
const Products  = lazy(()=>import( './app/activity/productList'));
const Service  = lazy(()=>import( './app/bnq365/service'))
const Share  = lazy(()=>import( './app/bnq365/share'))
const Rights  = lazy(()=>import( './app/bnq365/rights'))
const Send  = lazy(()=>import( "./app/bnq365/send"));
const Marketing  = lazy(()=>import( './app/marketing'))
const ExtendLH  = lazy(()=>import( './app/marketing/extendLH'))
const NewApproval  = lazy(()=>import( '@workOrder/app/approval/new'))
const ApprovalList  = lazy(()=>import( '@workOrder/app/approval/list'))
const ApprovalDetail  = lazy(()=>import( '@workOrder/app/approval/detail'))
const ExperienceCard  =  lazy(()=>import( './app/bnq365/experienceCard'))
const ComplaintList = lazy(()=>import('@workOrder/app/complaint/list'))
const ComplaintDetail = lazy(()=>import('@workOrder/app/complaint/detail'))
const AddComplaintDetail = lazy(()=>import('@workOrder/app/complaint/addDetail'))
const ReturnVisit = lazy(()=>import('@workOrder/app/complaint/returnVisit'))
const MarkDownList = lazy(() =>import('@workOrder/app/markDown/list'))
const MarkDownDetail = lazy(() =>import('@workOrder/app/markDown/detail'))
const MarkDownDetailApply = lazy(() =>import('@workOrder/app/markDown/applyDetail'))
const MarkDownDetailCmAudit = lazy(() =>import('@workOrder/app/markDown/cmDetail'))
const MarkDownDetailPorcessAudit = lazy(() =>import('@workOrder/app/markDown/bossDetail'))
const GocComplaintList = lazy(()=>import('@workOrder/app/govComplaint/list'))
const GovComplaintDetail = lazy(()=>import('@workOrder/app/govComplaint/detail'))
const AddComplaintLog = lazy(()=>import('@workOrder/app/complaint/addLog'))
const AddGovComplaintLog = lazy(()=>import('@workOrder/app/govComplaint/addLog'))
const EnergySavingDetailsRules = lazy(()=>import('./app/energySaving/details-rules'))

export default () => {
	return (
		<Router>			
			<Suspense id="router" fallback={<Loader spinning={true}/>}>
				<Route exact path="/" component={() => <Home/>} />
				<Route exact path="/preview" component={() => <Preview/>} />
				<Route exact path="/question" component={() => <Question1/>} />
				<Route exact path="/project" component={() => <Project/>} />
				<Route exact path="/survey" component={() => <SurveySheet/>} />
				<Route exact path='/contractOrderDetail/:id' component={() => <ContractOrderDetail/>} />
				<Route exact path='/measureOrderDetail/:id' component={() => <MeasureOrderDetail/>} />
				<Route exact path='/activity' component={() => <NewActivity/>} />
				<Route exact path='/products' component={() => <Products/>} />
				<Route exact path='/service' component={() => <Service/>} />
				<Route exact path='/share' component={() => <Share/>} />
				<Route exact path='/rights' component={() => <Rights/>} />
				<Route exact path='/send' component={() => <Send/>} />
				<Route exact path='/market' component={() => <Marketing/>} />
				<Route exact path='/extendLH' component={() => <ExtendLH/>} />
				<Route exact path='/newApproval' component={() => <NewApproval/>} />
				<Route exact path='/approvalList' component={() => <ApprovalList/>} />
				<Route exact path='/approvalDetail' component={() => <ApprovalDetail/>} />
				<Route exact path='/eCard' component={() => <ExperienceCard/>} />
				<Route exact path='/complaintList' component={() => <ComplaintList/>} />
				<Route exact path='/complaintDetail' component={() => <ComplaintDetail/>} />
				<Route exact path='/addComplaintDetail' component={() => <AddComplaintDetail/>} />
				<Route exact path='/returnVisit' component={() => <ReturnVisit/>} />
				<Route exact path='/markDownList' component={() => <MarkDownList />} />
				<Route exact path='/markDownDetail' component={()=> < MarkDownDetail/>} />
				<Route exact path='/markDownDetailApply' component={()=> < MarkDownDetailApply/>} />
				<Route exact path='/markDownDetailCmAudit' component={()=> < MarkDownDetailCmAudit/>} />
				<Route exact path='/markDownDetailProcessAudit' component={()=> < MarkDownDetailPorcessAudit/>} />
				<Route exact path='/govComplaintList' component={() => <GocComplaintList/>} />
				<Route exact path='/govComplaintDetail' component={() => <GovComplaintDetail/>} />
				<Route exact path='/addComplaintLog' component={() => <AddComplaintLog/>} />
				<Route exact path='/addGovComplaintLog' component={() => <AddGovComplaintLog/>} />
				<Route exact path='/energySavingDetailsRules' component={() => <EnergySavingDetailsRules/>} />
			</Suspense>
		</Router>
	);
}