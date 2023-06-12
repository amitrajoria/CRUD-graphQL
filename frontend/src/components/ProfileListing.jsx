import React, { useEffect, useState } from 'react'
import { createProfile, deleteProfile, getAllProfiles, getProfileById, updateProfile } from './Queries';
import { Box, Button, Container, Grid, Input, Stack, TextField } from '@mui/material';
import ProfileTable from './ProfileTable';
import CreateProfileModal from '../models/CreateProfileModel';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const ProfileListing = () => {
    
    const [profiles, setProfiles] = useState([]);
    const [profilesSize, SetprofilesSize] = useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({})
    const [modalFormType, setModalFormType] = useState("");
    const [search , setSearch] = useState("");
    
    // Handles for Create and Edit Profile
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
  
    // Setting state of page
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    // Setting state of RowsPerPage
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(event.target.value);
      setPage(0);
    };
    
    // Side Effect function which will work on profileSize/page/rowsPerPage/search State Change
    useEffect(() => {
        getAllProfiles(page, rowsPerPage, search)
        .then((res) => {
            res = res?.data;
            // console.log(res);
            setProfiles(res?.getAllProfiles?.profiles);
            SetprofilesSize(res?.getAllProfiles?.size);
        })
    }, [profilesSize, page, rowsPerPage, search])

    
    // Handle for Profile Update Modal
    const handleEditProfile = (profileId) => {
        getProfileById(profileId)
        .then((res) => {
            res = res?.data;
            // console.log(res);
            setModalData(res?.getProfileById);
        })
        setModalFormType("edit")
        handleModalOpen();
    }

    // Handle for PRofile Delete
    const handleDeleteProfile = (profileId) => {
        deleteProfile(profileId)
        .then((res) => {
            SetprofilesSize(-1);
        })
    }

    // Handle for profile Create
    const handleCreateProfile = () => {
        setModalData({});
        setModalFormType("create");
        handleModalOpen();
    }

    // Handle for Profile Create and Update
    const submitCreateEditForm = (formValues) => {
        if(modalFormType === "edit") {
            updateProfile(formValues?.id, formValues)
            .then((res) => {  
                console.log(res);
                SetprofilesSize(-1);
                handleModalClose();
            })
            .catch((err) => {
                alert("All Fields are Required !!");
            })
        } 
        else {
            createProfile(formValues)
            .then((res) => {  
                SetprofilesSize(-1);
                handleModalClose();
            })
            .catch((err) => {
                alert("All Fields are Required !!");
            })
        } 
    }

    // Search using the functionality of Debouncing 
    const debouncingSearch = (delay) => {
        let timer;
        return (e) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setSearch(e.target.value);
            }, delay)
        }
    }

    const searchProfile = debouncingSearch(300);


  return (
    <>
        <Box>
            <Container maxWidth="lg">
                <Stack spacing={5}>
                    <Grid container spacing={1}>
                        <Grid item lg={10}>
                            <TextField id="outlined-basic" label="Search" variant="outlined" size="small" style={{width: "100%"}}  onKeyUp={(e) => searchProfile(e)} />
                        </Grid>
                        <Grid item lg={2}>
                            <Button variant="outlined" startIcon={<PersonAddIcon />} onClick={handleCreateProfile}>
                                Create Profile
                            </Button>
                        </Grid>
                    </Grid >
                    
                    {/* Profile Data Table */}

                    <ProfileTable
                        profilesData={profiles}
                        size={profilesSize}
                        page={page} 
                        rowsPerPage={rowsPerPage} 
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        editProfile={handleEditProfile}
                        deleteProfile={handleDeleteProfile}
                    />

                </Stack>
            </Container>
        </Box>  

        {/* Create and Edit profile Modal */}

        <CreateProfileModal 
            formValues={modalData} 
            setFormValues={setModalData}
            formType={modalFormType}
            modalOpen={modalOpen} 
            handleModalOpen={handleModalOpen} 
            handleModalClose={handleModalClose} 
            submitCreateEditForm={submitCreateEditForm} />
    </>
  )
}

export default ProfileListing