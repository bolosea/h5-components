import React from "react";
import {Select} from "../../../components/select";

const filters = [
    {
        id: 'applyTime',      
        name: '申请日期',
        timeNames: [
            'applyTimeStartStr',
            'applyTimeEndStr'
          ],
        type: 'rangepicker'
    },
    {
        id: 'shopList',
        name: '门店',
        type: 'select',
    },

    {
        id: 'nodeStaus',
        name: '工单状态',
        type: 'select',
    },

];
export {
    filters
}
