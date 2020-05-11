import React, {useState, useEffect } from 'react';
import moment from 'moment';
import Addtraining from './Addtraining';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';


export default function Training() {
const [trainings, setTrainings] = useState([]);
const [open, setOpen] = useState(false);

useEffect(() => fetchData(), []);

const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data)
    )
};

const addTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
    })
    .then(_ => fetchData())
}

const deleteTraining = (link) => {
    if (window.confirm('Are you sure you want to delete this training?')){
    fetch('https://customerrest.herokuapp.com/api/trainings/' + link, {
        method: 'DELETE'
    })
    .then(_ => fetchData())
    }
}


const columns = [

    {
        Cell: row => 
        <Tooltip title="Delete"><IconButton className="button"  onClick={() => deleteTraining(row.original.id)}>
            <DeleteIcon /> 
            </IconButton></Tooltip>,
        filterable: false,
        sortable: false,
        width: 70,
    },
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
        <Addtraining addTraining={addTraining}/>
            <ReactTable filterable={true} defaultPageSize={10} data={trainings} columns={columns} />
        </div>
    )
}
