import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, BrowserRouter, Routes } from 'react-router-dom';
import '../style/admin.css';


const addPackage = async (packageData) => {
    try {
        const response = await axios.post(`/packages/add`, packageData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
const editPackage = async (packageId, packageData) => {
    try {
        const response = await axios.post(`/packages/edit/` + packageId, packageData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
const deletePackage = async (packageId) => {
    try {
        const response = await axios.post(`/packages/delete/` + packageId);
        return response.data;
    } catch (error) {
        throw error;
    }
};

function Admin() {
    const [loggedIn, setIsLoggedIn] = useState([]);
    const [packages, setPackages] = useState([]);
    const [editingPackage, setEditingPackage] = useState(null);
    const [deletingPackage, setDeletingPackage] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        country: '',
        noOfDays: '',
        images: [],
        location: '',
        rate: ''
    });

    useEffect(() => {
        axios.get('/packages')
            .then((response) => {
                setPackages(response.data);
            })
            .catch((error) => {
                console.error(error);
                if (error.response.data.status === 1004) {

                   setIsLoggedIn(false);
                }
            });

    }, []);

    const handleAddPackage = async () => {
        try {
            const response = await addPackage(formData);
            // Handle success (maybe show a success message, update the UI, etc.)
            alert('Package added successfully');
            console.log('Package added successfully:', response);
            // Clear the form data
            setFormData({
                title: '',
                description: '',
                country: '',
                noOfDays: '',
                images: [],
                location: '',
                rate: '',
            });
            // Refresh the list of packages (optional)
            axios.get('/packages')
                .then((response) => {
                    setPackages(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            // Handle error (show an error message, log the error, etc.)
            console.error('Error adding package:', error);
        }
    };

    const handleEditPackage = async () => {
        if (!editingPackage) return;

        try {
            const response = await editPackage(editingPackage._id, formData);
            // Handle success (maybe show a success message, update the UI, etc.)
            alert('Package edited successfully');
            console.log('Package edited successfully:', response);
            // Clear the form data
            setFormData({
                title: '',
                description: '',
                country: '',
                noOfDays: '',
                images: [],
                location: '',
                rate: '',
            });
            // Reset the editingPackage state
            setEditingPackage(null);
            // Refresh the list of packages (optional)
            axios.get('/packages')
                .then((response) => {
                    setPackages(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            // Handle error (show an error message, log the error, etc.)
            console.error('Error editing package:', error);
        }
    };
    const handleDeleteClick = async (packageToDelete) => {        
        setDeletingPackage(packageToDelete);
        if (!packageToDelete) return;

        try {
            const response = await deletePackage(packageToDelete._id);
           
            alert('Package deleted successfully');
            console.log('Package deleted successfully:', response);
            // Clear the form data
            setFormData({
                title: '',
                description: '',
                country: '',
                noOfDays: '',
                images: [],
                location: '',
                rate: '',
            });
            // Reset the editingPackage state
            setDeletingPackage(null);
            // Refresh the list of packages (optional)
            axios.get('/packages')
                .then((response) => {
                    setPackages(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            // Handle error (show an error message, log the error, etc.)
            console.error('Error editing package:', error);
        }

    };
    const handleEditClick = (packageToEdit) => {
        // Set the formData with the existing package data
        setFormData({
            title: packageToEdit.title,
            description: packageToEdit.description,
            country: packageToEdit.country,
            noOfDays: packageToEdit.noOfDays,
            images: packageToEdit.images,
            location: packageToEdit.location,
            rate: packageToEdit.rate,
        });
        // Set the editingPackage state
        setEditingPackage(packageToEdit);
    };
    console.log('username:',localStorage.getItem('userName'));
    if(!loggedIn || !localStorage.getItem('userName') || localStorage.getItem('userName').localeCompare('admin@admin.com')){

        return (<div>pls login with admin</div>)
    }
    return (       
        <div className="container">
            <h2 className="heading">Admin Packages Page</h2>

            {/* Form for adding/editing packages */}
            <form className="form">
                <label className="label">Title:</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <label className="label">Description:</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <label className="label">Country:</label>
                <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
                <label className="label">Number Of Days:</label>
                <input
                    type="text"
                    value={formData.noOfDays}
                    onChange={(e) => setFormData({ ...formData, noOfDays: e.target.value })}
                /><label className="label">Image URL:</label>
                <input
                    type="text"
                    value={formData.images}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                /><label className="label">Location Geo code:</label>
                <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                /><label className="label">Rate:</label>
                <input
                    type="text"
                    value={formData.rate}
                    onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                />
                {/* end of form */}
                <button className="button" type="button" onClick={editingPackage ? handleEditPackage : handleAddPackage}>
                    {editingPackage ? 'Edit Package' : 'Add Package'}
                </button>
            </form>

            {/* List of existing packages */}
            <ul className="list">
                {packages.map((tour) => (
                    <li key={tour.id} className="list-item">
                        {tour.title} - {tour.description}
                        {tour.description} - {tour.description}
                        {tour.country} - {tour.country}
                        {tour.noOfDays} - {tour.noOfDays}
                        {tour.images} - <img src={tour.images} />
                        {tour.rate} - {tour.rate}

                        <button onClick={() => handleEditClick(tour)}>Edit</button>
                        <button onClick={() => handleDeleteClick(tour)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Admin;
