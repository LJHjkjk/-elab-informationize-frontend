import { Container, Row, Col,Card,Table,FloatingLabel,Button,Badge, Modal, Form} from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useState } from 'react';
import {Routes,Route,Link,useParams} from 'react-router-dom';

import { RequireLogin } from '../components/Login';
import SelectItems,{UserItem} from '../components/Search';
import { useUserContext } from '../context/UserContext';
import config from '../config';

/*
功能需求：
1.查看邮件
2.发送邮件 
*/

//邮件中心页面
function MailCenter(){
	return (
		<div>
			<RequireLogin
			logined={<MailCenterData/>}
			notlogin={
				<p>还未登陆，请先登陆</p>
			}
			/>
		</div>
	)
  }

export default MailCenter


//邮件中心路由设置
function MailCenterData(){
	return (    
		<Card>
			<Routes basePath='mail' >
				<Route path='/' element={<MailCenterTabs/>}/>
				<Route path='/mail-details/:id' element={<MailDetails/>}/>
			</Routes>
		</Card>
  )
}

//邮件中心的选项卡
function MailCenterTabs({}){
	//获取邮件信息
	return (
		<Tabs
			defaultActiveKey="home"
			className="my-3 mx-3"
		>
			<Tab className="my-3 mx-3"  eventKey="home" title="家">
				<Container>
					<Row>
						<Link to="/mail/mail-details/1">查看邮件1</Link>
					</Row>
				</Container>
			</Tab>
			<Tab className="my-3 mx-3"  eventKey="mailbox" title="收件箱">
				<Routes basePath='mail'>
					<Route path='/' element={<Mailbox page={1}/>}/>
					<Route path='/mailbox' element={<Mailbox/>}/>
				</Routes>
			</Tab>
			<Tab className="my-3 mx-3" eventKey="send-mail" title="发送邮件">
				<SendMail/>
			</Tab>
		</Tabs>
	)
}


//邮件详情页面
function MailDetails(){
	const { id } = useParams();

	return (
		<div><p>pppp</p><p>{id}</p></div>
		
	)
}
//收件箱
function Mailbox(){
	//获取页数
	const {page,setPage}=useState(1)
		
	//获取对应页数的数据


	//渲染邮件

	function MailItem({sender,theme,overview,date,operation,is_todo=false}){
		const customMaxWidthStyle = {
			maxWidth: '150px', // 设置你想要的最大宽度
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
		};
		return (
			<tr>
				<th >
					{sender}
				</th>
				<th style={customMaxWidthStyle}>
					{theme}
				</th>
				<th style={customMaxWidthStyle}>
					{overview}
				</th>
				<th>
					{date}
				</th>
				<th>
					{operation}
					{!is_todo?<Badge pill bg="secondary">新</Badge>:<></>}
				</th>
			</tr>
		)
	}
	return(
		<Container>
			<Row>
				<Table striped bordered hover responsive >
					<thead>
						<tr>
							<th>发件人</th>
							<th>主题</th>
							<th>概览</th>
							<th>时间</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<MailItem 
						sender='adadw'
						theme='dwaaaaaaaaaaaaddddddddddddddddddddddaaaaaa' 
						overview='dddddddddddddddddddddddddddddddddddddddddd'
						date='dddddd'
						operation={<a href='da'>查看</a>}
						/>
					</tbody>
				</Table>
			</Row>
			<Row>
				<Col><a href='#'>跳转</a></Col>
				<Col><a href='#'>上一页</a></Col>
				<Col><a href='#'>下一页</a></Col>
			</Row>
		</Container>
	)
}


//发送邮件选项卡
function SendMail(){
	const [show,setshow]=useState(false)
	const [receivers,setReceivers]=useState([])

	function finishedSelect(event,selectedItems){
		setReceivers([...selectedItems])
		setshow(false)
	}
	const users=[
		{
			name:'ljh',
			id:1,
			avatar:'http://localhost:3000/logo192.png'
		},		{
			name:'aiolj',
			id:2,
			avatar:'http://localhost:3000/logo192.png'
		},		{
			name:'heidwsdiwao',
			id:3,
			avatar:'/'
		},		{
			name:'jfghushfc',
			id:14,
			avatar:'/'
		},
	]
	return(
		<Container>
			<SelectItems 
			items={users} 
			show={show} 
			ShowItem={UserItem} 
			close={()=>setshow(false)}
			finishedSelect={finishedSelect}
			preselected={receivers}
			/>
			<Row className='my-2'>
				<Col className='col-3'>
					<Button  onClick={()=>setshow(true)}>选择收件人</Button>
				</Col>
				<Col >
					{receivers.length==0?'没有选择收件人':'已选择'+ String(receivers.length) +'人'}
				</Col>
			</Row>
			<Row className='my-2'>
				<Form>
					<FloatingLabel
						controlId="floatingInput"
						label="主题"
						className="mb-3"
					>
						<Form.Control type="email" placeholder=''/>
					</FloatingLabel>
					<Form.Group>
						<Form.Label>正文</Form.Label>
						<Form.Control as='textarea' rows={10}/>
					</Form.Group>
					<Form.Group className='my-3'>
						<Form.Label>添加附件</Form.Label>
						<Form.Control type='file'></Form.Control>
					</Form.Group>
					<Button className='my-3'>提交</Button>
				</Form>
			</Row>
		</Container>
	)
}