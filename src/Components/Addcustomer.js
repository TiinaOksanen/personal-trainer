import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function Addcustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value })
      }

      const addCustomer = () => {
          props.addCustomer(customer);
          handleClose();
      }

    return (
        <div>
      <Button style={{margin: 5}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new customer
        </Button>

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
         <DialogTitle id="form-dialog-title">New customer</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                name="firstname"
                value={customer.firstname}
                onChange={e => handleInputChange(e)}
                label="Firstname"
                fullWidth
            />
             <TextField
                margin="dense"
                name="lastname"
                value={customer.lastname}
                onChange={e => handleInputChange(e)}
                label="Lastname"
                fullWidth
            />
                 <TextField
                margin="dense"
                name="email"
                value={customer.email}
                onChange={e => handleInputChange(e)}
                label="Email"
                fullWidth
            />
                 <TextField
                margin="dense"
                name="phone"
                value={customer.phone}
                onChange={e => handleInputChange(e)}
                label="Phone"
                fullWidth
            />
                 <TextField
                margin="dense"
                name="streetaddress"
                value={customer.streetaddress}
                onChange={e => handleInputChange(e)}
                label="Address"
                fullWidth
            />
                 <TextField
                margin="dense"
                name="postcode"
                value={customer.postcode}
                onChange={e => handleInputChange(e)}
                label="Postcode"
                fullWidth
            />
              <TextField
                margin="dense"
                name="city"
                value={customer.city}
                onChange={e => handleInputChange(e)}
                label="City"
                fullWidth
            />
            </DialogContent>
         <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cancel
                </Button>
                <Button onClick={addCustomer} color="primary">
                Save
                </Button>
          </DialogActions>
    </Dialog>

        </div>
    )

}