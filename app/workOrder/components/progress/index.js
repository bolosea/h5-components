import React, {useEffect, useState} from 'react'
import './index.less'
import Choose from "@workOrder/imgs/choose@3x.png";
import Current from "@workOrder/imgs/current@3x.png";
import Next from "@workOrder/imgs/next@3x.png";

export default function Progress({flowMapList = []}) {
	
	const [currentIndex, setCurrentIndex] = useState(() => {
		return flowMapList.findIndex(i => i.ifCurrentNode)
	})
	
	useEffect(() => {
		let imgs = document.querySelectorAll('.progress img')
		for (let i = 0; i < imgs.length - 1; i++) {
			let left = imgs[i].offsetLeft
			let div = document.createElement('div')
			div.style.position = 'absolute'
			div.style.top = '75%'
			div.style.left = left + imgs[i].offsetWidth + 'px'
			if (i === imgs.length - 2) {
				div.style.borderTop = '1px dashed #FFF'
			} else {
				div.style.height = '1px'
				div.style.background = '#fff'
			}
			div.style.width = imgs[i + 1].getBoundingClientRect().left - imgs[i].getBoundingClientRect().left - imgs[i].getBoundingClientRect().width + 'px'
			div.classList.add('line')
			imgs[i].parentNode.appendChild(div)
		}
		
	}, [])
	
	return (
		<div className="progress">
			<span>订单动态</span>
			<ul>
				{
					flowMapList && flowMapList.map((dml, index) => {
						
						let cname
						if (currentIndex === -1) {
							cname = 'circle'
						} else if (currentIndex === index) {
							cname = 'current'
						} else if (index < currentIndex) {
							cname = 'circle'
						} else {
							cname = 'next'
						}
						return (
							<li key={index}>
								<p>{dml.nodeStatusName}</p>
								<img alt={'state'} className={cname}
								     src={cname === 'circle' ? Choose : (cname === 'current' ? Current : Next)}/>
							</li>
						);
					})}
			</ul>
		</div>
	)
}