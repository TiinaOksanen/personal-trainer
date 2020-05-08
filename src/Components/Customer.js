import React, {useState, useEffect } from 'react';
import ReactTable from 'react-table';


export default function Customer() {
const [customers, setCustomers] = useState([]);

useEffect(() => fetchData(), []);

const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
}


const columns = [
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
        <header><p>Customers</p></header>
 <ReactTable filterable={true} defaultPageSize={10} data={customers} columns={columns} />   

    </div>
)


}