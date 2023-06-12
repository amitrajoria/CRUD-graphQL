import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function CreateProfileModal({formValues, setFormValues, formType, modalOpen, handleModalOpen, handleModalClose, submitCreateEditForm}) {
    // const form = {};
    // console.log(modalData);
    // const [formValues, setFormValues] = React.useState({})
    // const formValues = {
    //     description : "Amit user created",
    //     email: "Amit@gmail.com",
    //     first_name: "Amit",
    //     id: "64845c053dec18800cf642a7",
    //     image_url: "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg",
    //     is_verified: true,
    //     last_name: "Rajoria"
    // }
    React.useEffect(() => {
        setFormValues(formValues);
    }, [formValues])

    // console.log(formValues);
    // console.log(formValues.is_verified);


  const inputChange = (e) => {
    // console.log(e.target.name);
    setFormValues({
        ...formValues,
        [e.target.name] : ( (e.target.name === "is_verified") ? e.target.checked : e.target.value)
    })
  }

  const setVerify = () => {
    let formData = formValues;
    const verifyVar = "is_verified";
    Object.assign(formData, { [verifyVar] : (formValues?.is_verified) ? formValues?.is_verified : false }); 
    setFormValues({...formData})
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(formValues?.is_verified === undefined)
      setVerify();
      
    // console.log(formValues);
    if(!formValues?.image_url || !formValues?.first_name || !formValues?.last_name || !formValues?.email || !formValues?.description) {
      alert("All Fields are Required frontend"); 
    }

    submitCreateEditForm(formValues);
  }

  return (
    <div>
        <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="modal-size">
            <Typography id="modal-modal-title" variant="h6" component="h2">
                { (formType === "edit") ? "Edit Profile" : "Create Profile"}
            </Typography>
            
            <Box component="form" id="modal-modal-description" noValidate 
                onSubmit={(e) => handleFormSubmit(e)} 
                sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="image_url"
                  label="Image Link"
                  name="image_url"
                  autoComplete="image"
                  autoFocus
                  value={formValues.image_url}
                  onChange={(e) => inputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  value={formValues.first_name}
                  onChange={(e) => inputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  value={formValues.last_name}
                  onChange={(e) => inputChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formValues.email}
                  onChange={(e) => inputChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  maxRows={4}
                  name="description"
                  label="Description"
                  id="outlined-multiline-static"
                  autoComplete="description"
                  value={formValues.description}
                  onChange={(e) => inputChange(e)}
                />
              </Grid>
              <Grid
                item lg={12}
                direction="row"
                container
                justifyContent="space-between"
                ml={2}
                mt={2}
                style={{backgroundColor: "#f1f3f4"}}
                >
                    <Typography variant="subtitle1" gutterBottom>
                        Talent is Verified
                    </Typography>
                    <Switch name='is_verified' defaultChecked={formValues.is_verified} onChange={(e) => inputChange(e)} />
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleFormSubmit(e)}
            >
              { (formType === "edit") ? "Edit Profile" : "Create Profile"}
            </Button>
          </Box>
          </Box>
        </Modal>
    </div>
  );
}