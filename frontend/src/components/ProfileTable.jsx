import * as React from 'react';
import { Box, Button, Container, Grid, Input, Stack, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Badge from '@mui/material/Badge';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import RemoveProfileDialog from '../models/RemoveProfileDialog';



export default function ProfileTable({ profilesData, size, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, editProfile, deleteProfile  }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [optionID, setOptionId] = React.useState("");
    const [options, setOptions] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleDialogOpen = () => {
      setDialogOpen(true);
    };
    const handleDialogClose = () => {
      setDialogOpen(false);
      setOptions((prev) => !prev);
    };

    const openSettingOptions = (e, profileId) => {
      setOptionId(profileId);
        setAnchorEl(e.currentTarget);
        setOptions((prev) => !prev);
    };

    // Calling deleteProfile from parent (Profile Listing )
    const deleteProfileModal = (id) => {
        deleteProfile(id);
        setDialogOpen(false);
        setOptions((prev) => !prev);
    }

  // Calling editProfile from parent (Profile Listing )
    const editProfileModal = (id) => {
      editProfile(id);
      setOptions((prev) => !prev);
    }


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor : '#f1f3f4' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell sx={{ backgroundColor : '#f1f3f4', minWidth: '250px' }}>Name</TableCell>
                <TableCell sx={{ backgroundColor : '#f1f3f4', minWidth: '200px' }}>ID</TableCell>
                <TableCell sx={{ backgroundColor : '#f1f3f4', minWidth: '200px' }}>Email</TableCell>
                <TableCell sx={{ backgroundColor : '#f1f3f4' }}>Description</TableCell>
                <TableCell sx={{ backgroundColor : '#f1f3f4' }}><SettingsIcon fontSize="small"/></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            profilesData
            //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((profile) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={profile.id}>
                    <TableCell> 
                        <Stack direction="row" spacing={2}>
                            <Avatar alt="Remy Sharp" src={profile.image_url} /> 
                            <Typography variant="subtitle1" gutterBottom paddingTop={'7px'}>
                                { profile.first_name+" "+profile.last_name}
                            </Typography>
                            {(profile.is_verified) ? <Badge badgeContent={'V'} color="primary" style={{ margin: "20px" }}></Badge> : "" }
                        </Stack>
                    </TableCell>
                    <TableCell>{ profile.id } </TableCell>
                    <TableCell>{ profile.email }</TableCell>
                    <TableCell>{ profile.description }</TableCell>
                    <TableCell>
                        <MoreVertIcon  onClick={(e) => openSettingOptions(e, profile.id)} />
                        
                        {/* Code for show Setting options */}

                        <Popper open={options} anchorEl={anchorEl} placement={'left-start'} transition>
                            {({ TransitionProps }) => (
                            <Fade {...TransitionProps}>
                                <Stack backgroundColor={'white'} textAlign={'left'}>
                                    <Button style={{color: 'black'}} onClick={() => editProfileModal(optionID)}> Edit Profile</Button>
                                    <Button style={{color: 'black'}}  onClick={() =>handleDialogOpen()}> Remove Profile</Button>
                                    
                                    {/* Component of Delete Dialog */}

                                    <RemoveProfileDialog 
                                      id={optionID} 
                                      deleteProfileModal={deleteProfileModal}
                                      open={dialogOpen}
                                      handleClickOpen={handleDialogOpen} 
                                      handleClose={handleDialogClose}
                                      />
                                </Stack>
                            </Fade>
                            )}
                        </Popper>    
                    </TableCell>
                    
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={size}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    
  );
}