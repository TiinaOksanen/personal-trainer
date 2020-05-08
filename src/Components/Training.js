import React, {useState, useEffect } from 'react';
import moment from 'moment';

import ReactTable from 'react-table';
import 'react-table/react-table.css';


export default function Training() {
const [trainings, setTrainings] = useState([]);

useEffect(() => fetchData(), []);

const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data)
    )
    
    
};


const columns = [
    {
        Header: 'Activity',
        accessor: 'activity',
    
        
    },
    {
        Header: 'Date',
        accessor: 'date',
        Cell: row => <span>{moment(row.value).format('L LT')}</span>
        
    },
    {
        Header: 'Duration (min)',
        accessor: 'duration'
    },
    {
        Header: 'Customer',
        accessor: 'customer',
        Cell: row => (
            <span>
            {row.original.customer.firstname} {row.original.customer.lastname}
            </span>
        )  
    }
]



    return (
        <div>
            <header><p>Trainings</p></header>
            <ReactTable filterable={true} defaultPageSize={10} data={trainings} columns={columns} />
        </div>
    )
}


