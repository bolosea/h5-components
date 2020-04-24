import React, { useEffect, useState } from 'react'
import './index.less'
import Choose from "@workOrder/imgs/icon-timeline-arrow@3x.png";
import Current from "@workOrder/imgs/icon-timeline-load@3x.png";
import Next from "@workOrder/imgs/next@3x.png";

//progress组建
export default function Progress({flowMapList = []}) {
       
    const [currentIndex, setCurrentIndex] = useState(-1)


    useEffect(() => {
        setCurrentIndex(flowMapList.findIndex(i => i.ifCurrentNode));
    },[flowMapList])

    return (
        <div className="order-status">
            <div className="order-container">
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
                            <div className="order-item" key={dml.nodeStatusName}>
                                <div className="img">

                                    <img alt={'state'} className={cname === 'next'?' next' :''}
                                        src={cname === 'circle' ? Choose : (cname === 'current' ? Current : Next)} />
                                    {
                                        index !== 0 && <div className={cname === 'circle' ? 'line' : (cname === 'current' ? 'line' : 'dotted')}></div>
                                    }

                                </div>
                                <div className="item-text">
                                    <h5>{dml.nodeStatusName}</h5>
                                    {
                                        dml.time && <span>{dml.time}</span>
                                    }
                                    {
                                        dml.cmFlows && dml.cmFlows.map((cml, index) => (
                                            <div key={cml.nodeStatusName}>
                                                <span>{cml.nodeStatusName}</span>
                                                {cml.time && <span>{dml.time}</span>}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        );
                    })}

            </div>

        </div>
    )
}

