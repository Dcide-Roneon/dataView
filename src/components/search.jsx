import React, { useState } from "react";
import {
    isValidCapacity,
    isValidLatitude,
    isValidLongitude,
} from "../components/validation.js";

 const initialFormState = {
        company: " ",
        dataCenter: "",
        latitude:"",
        longitude: "",
        mwCapacity: "",
        certifications:"",
    };//use state vasriables

    function Form() {
        const [form,setForm]= useState(initialFormState);

        function handleChange(e){ //How input changes are handled
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
        }
        function handleSubmit(e){
            e.preventDefault();

            if(!isValidLatitude(form.latitude)){
                alert("Latitude must be a number between -80 and 80");
                return;
            }
            if(!isValidLongitude(form.longitude)){
                alert("Longitude must be a number between -180 and 180");
                return;
            }
            if(!isValidCapacity(form.mwCapacity)){
                alert("MW Capacity must be a positive number");
                return;
            }
            console.log("Form submitted: ", form);
        }

        return (
            <form onSubmit ={handleSubmit}>
                <input
                    name = "company"
                    value = {form.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                />
                <input
                    name = "dataCenter"
                    value = {form.dataCenter}
                    onChange={handleChange}
                    placeholder="DataCenter Name"
                />
                <input
                    name="latitude"
                    value={form.latitude}
                    onChange={handleChange}
                    placeholder="Latitude"
                />
                <input
                    name="longitude"
                    value={form.longitude}
                    onChange={handleChange}
                    placeholder="Longitude"
                />
                <input
                    name="mwCapacity"
                    value={form.mwCapacity}
                    onChange={handleChange}
                    placeholder="MW Capacity"
                />
                <input 
                    name="certifications"
                    value={form.certifications}
                    onChange={handleChange}
                    placeholder="Certifications"
                />
            </form>
        );
    }

    export default Form;
    