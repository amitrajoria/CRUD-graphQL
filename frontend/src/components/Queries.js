import axios from 'axios';
import React from 'react'

const getAllProfiles = (page, rowsPerPage, search) => {
    return axios.post("http://localhost:8000", {
        query: `query GetAllProfiles($orderBy: globalOrderBy, $searchString: String, $rows: Int, $page: Int) {
            getAllProfiles(orderBy: $orderBy, searchString: $searchString, rows: $rows, page: $page) {
              size
              profiles {
                id
                first_name
                last_name
                email
                is_verified
                image_url
                description
              }
            }
          }`,
          variables: {
            "orderBy": {
              "key": "is_verified",
              "sort": "desc"
            },
            "rows": rowsPerPage,
            "page": page,
            "searchString": search
          }
        })
        .then((res) => res.data);
}

const getProfileById = (profileId) => {
      return axios.post("http://localhost:8000", {
        query: `query GetProfileById($getProfileByIdId: String!) {
          getProfileById(id: $getProfileByIdId) {
            id
            first_name
            last_name
            email
            is_verified
            image_url
            description
          }
        }`,
          variables: {
            "getProfileByIdId": profileId
          }
        })
        .then((res) => res.data);
}

const updateProfile = (id, data) => {
  return axios.post("http://localhost:8000", {
    query: `mutation UpdateProfile($updateProfileId: String!, $firstName: String!, $lastName: String!, $email: String!, $isVerified: Boolean!, $imageUrl: String!, $description: String!) {
      updateProfile(id: $updateProfileId, first_name: $firstName, last_name: $lastName, email: $email, is_verified: $isVerified, image_url: $imageUrl, description: $description) {
        id
        first_name
        last_name
        email
        is_verified
        image_url
        description
      }
    }`,
      variables: {
        "updateProfileId": id,
        "firstName": data?.first_name,
        "lastName": data?.last_name,
        "email": data?.email,
        "isVerified": data?.is_verified,
        "imageUrl": data?.image_url,
        "description": data?.description
      }
    })
    .then((res) => res.data);
}

const createProfile = (data) => {
  return axios.post("http://localhost:8000", {
    query: `mutation CreateProfile($firstName: String!, $lastName: String!, $email: String!, $isVerified: Boolean!, $imageUrl: String!, $description: String!) {
      createProfile(first_name: $firstName, last_name: $lastName, email: $email, is_verified: $isVerified, image_url: $imageUrl, description: $description) {
        id
        first_name
        last_name
        email
        is_verified
        image_url
        description
      }
    }`,
      variables: {
        "firstName": data?.first_name,
        "lastName": data?.last_name,
        "email": data?.email,
        "isVerified": data?.is_verified,
        "imageUrl": data?.image_url,
        "description": data?.description
      }
    })
    .then((res) => res.data);
}

const deleteProfile = (id) => {
  return axios.post("http://localhost:8000", {
    query: `mutation DeleteProfile($deleteProfileId: String!) {
      deleteProfile(id: $deleteProfileId)
    }`,
      variables: {
        "deleteProfileId": id
      }
    })
    .then((res) => res.data);
}

export {
    getAllProfiles,
    getProfileById,
    updateProfile,
    createProfile,
    deleteProfile
}