import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from "@material-ui/core/MenuItem";
import DateTimePicker from 'react-datetime-picker';

export default function Addtraining(props) {
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [training, setTraining] = useState({
        activity: '', date: new Date() , duration: '', customer: ''
    })

    const fetchData = () => {
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
  }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleDateChange = (event) => {
        const date = event;
        setTraining({
          ...training,
          date: date
          
        });
      };

      const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value })
      }

      const addTraining = () => {
          props.addTraining(training);
          handleClose();
        
      }

    return (
        <div>
          
          <Button style={{margin: 5}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new Training
        </Button>
    
    <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
         <DialogTitle id="form-dialog-title">Add new training to customer</DialogTitle>
            <DialogContent className="dialog">

            <TextField
            select
              label="List of customers"
              name="customer"
              onClick={fetchData}
              value={training.customer}
              onChange={e => handleInputChange(e)}
              fullWidth
              autoFocus
            >
              {customers.map(customer  => (
                <MenuItem
                  key={customer.links[0].href}
                  value={customer.links[0].href}
                >{customer.firstname} {customer.lastname}</MenuItem>
              ))}
              
              </TextField>
        
                <TextField
                
                margin="dense"
                name="activity"
                value={training.activity}
                onChange={e => handleInputChange(e)}
                label="Activity"
                fullWidth
            />
            <DateTimePicker
              name="date"
              label="Date"
              value={training.date}
              onChange={e => handleDateChange(e)}
             
            />
                 <TextField
                margin="dense"
                name="duration"
                value={training.duration}
                onChange={e => handleInputChange(e)}
                label="Duration (min)"
                fullWidth
            />
            </DialogContent>
         <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cancel
                </Button>
                <Button onClick={addTraining} color="primary">
                Save
                </Button>
          </DialogActions>
    </Dialog>

        </div>
    )

}

