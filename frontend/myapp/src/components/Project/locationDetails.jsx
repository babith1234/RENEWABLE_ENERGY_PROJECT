import ProjectsLayout from './ProjectLayout';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
const ProjectLocation = () => {
    const [location, setLocation] = useState({
        location_name: '',
        location_country: '',
        location_lat:'',
        location_lon:''
      });
      const navigate = useNavigate();
      const handleSuccess = (msg) =>
      toast.success(msg, {
        position: "top-right",
      });
      useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('locationDetails'));
        if (storedData) {
            setLocation(storedData);
        }
      }, []);
    const handleSubmit=(e)=>{
        e.preventDefault();
    // Save the form data
    handleSuccess("Project Location Details Saved")
    setTimeout(() => {
    }, 500)
    console.log(location);
    localStorage.setItem('locationDetails', JSON.stringify(location));
    }
    const handleInputChange=(e)=>{
        const { name, value } = e.target;
        setLocation(prevState => ({
          ...prevState,
          [name]: value
        }));
    }
    return ( 
        <>
       <ProjectsLayout/>
       <div className="min-h-[95vh] div-bg flex justify-center items-baseline">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[50%] mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Location Details</h1>
      <form class='max-w-[75%] m-auto ' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="location_name" className="block text-gray-700 text-sm font-bold mb-2">Project Location Name:</label>
        <input type="text" id="location_name" name="location_name" value={location.location_name} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div>
        <label htmlFor="location_country" className="block text-gray-700 text-sm font-bold mb-2">Project Locaion Country:</label>
        <input type="text" id="location_country" name="location_country" value={location.location_country} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div>
        <label htmlFor="location_lat" className="block text-gray-700 text-sm font-bold mb-2">Location Latitude:</label>
        <input type="number" id="location_lat" name="location_lat" value={location.location_lat} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div>
        <label htmlFor="location_lon" className="block text-gray-700 text-sm font-bold mb-2">Location Longitude:</label>
        <input type="number" id="location_lon" name="location_lon" value={location.location_lon} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className='flex justify-evenly'>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700" onClick={() => navigate('/risksdetails')}>Back</button>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 " >Save</button>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 " onClick={() => navigate('/orgdetails')}>Next</button>
      </div>    
      </form>
      <ToastContainer />
      </div>
</div>
    </>
     );
}
 
export default ProjectLocation;