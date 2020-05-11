import React, {useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

export default function Customer() {
const [customers, setCustomers] = useState([]);
const [open, setOpen] = useState(false);

useEffect(() => {
    fetchData();
} , []);

const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
}

const addCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(_ => fetchData())
}

const updateCustomer = (customer, link) => {
    fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(_=> fetchData())
}

const deleteCustomer = (link) => {
    if (window.confirm('Are you sure?')){
    fetch(link, {method: 'DELETE'})
    .then(_ => fetchData())
    .then(_ => setOpen(true))
    }
}

const columns = [

    {
        filterable: false,
        sortable: false,
        width: 70,
        Cell: row => <Editcustomer className="button" updateCustomer={updateCustomer} customer={row.original} />  
    },
    {
        Cell: row => (<Tooltip title="Delete"><IconButton className="button" onClick={() => deleteCustomer(row.original.links[0].href)}><DeleteIcon /> </IconButton></Tooltip>),
        filterable: false,
        sortable: false,
        width: 70,
    },

    {
        Header: 'Firstname',
        accessor: 'firstname'
    },
    {
        Header: 'Lastname',
        accessor: 'lastname'
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Phone',
        accessor: 'phone'
    },
    {
        Header: 'Address',
        accessor: 'streetaddress'
    },
    {
        Header: 'Postcode',
        accessor: 'postcode'
    },
    {
        Header: 'City',
        accessor: 'city'
    },
]

return (
    <div>
        
        <header className="header"><p>Customers</p></header>
        <div className="add"> 
        <Addcustomer addCustomer={addCustomer}/>
        </div>
 <ReactTable filterable={true} defaultPageSize={10} data={customers} columns={columns}
 />
    </div>
    )
}