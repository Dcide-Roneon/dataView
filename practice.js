import React, { useState , useEffect} from "react";
import {
    isValidCapacity,
    isValidLatitude,
    isValidLongitude,
} from "../utils/validation.js";
import Form from "./Form.jsx";
import {fetchAndParseCsv} from "./csv.js";
import { getDistanceFromLatLonInKm } from "../utils/distance.js";
import LinearWithValueLabel from "./loading.jsx";
import ResultsList from "./resultList.jsx";


 const initialFormState = {
        company: " ",
        dataCenter: "",
        latitude:"",
        longitude: "",
        radius: "",
        mwCapacity: "",
        certifications:"",
    };//use state vasriables

    function FormContainer() {
        const [form,setForm]= useState(initialFormState);
        const[errors, setErrors]= useState({});
        const [csvData, setCsvData] = useState([]);
        const [results, setResults] = useState([]);
        const [searchDone, setSearchDone] = useState(false);
        const[isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            fetchAndParseCsv("/leads.csv")
            .then((data) => setCsvData(data))
            .catch((err) => {
                console.error("CSV fetch/parse error", err)
            });
        }, []);

        function handleChange(e){ //How input changes are handled
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
            setErrors({...errors, [e.target.name]: ""});
        }
        const handleSubmit = (e) => {
            e.preventDefault();
            const newErrors = {};
          
            if (!isValidLatitude(form.latitude)) {
              newErrors.latitude = "Latitude must be a number between -90 and 90.";
            }
            if (!isValidLongitude(form.longitude)) {
              newErrors.longitude = "Longitude must be a number between -180 and 180.";
            }
            if (!form.radius || isNaN(form.radius) || Number(form.radius) <= 0) {
                newErrors.radius = "Radius must be a positive number.";
            }


            //optional
          
            if (form.mwCapacity && !isValidCapacity(form.mwCapacity)) {
              newErrors.mwCapacity = "MW Capacity must be a positive number.";
            }
        
            if (Object.keys(newErrors).length > 0) {
              setErrors(newErrors);
              return;
            }
            setErrors({});
            setIsLoading(true);
            setSearchDone(false);          


                    setTimeout(() => {
                        const matches = csvData.filter(row => {
                            const distance = getDistanceFromLatLonInKm(
                            Number(form.latitude.trim()),
                            Number(form.longitude.trim()),
                            Number(row.latitude),
                            Number(row.longitude)
                            );

                            return (
                            distance <= Number(form.radius.trim()) &&
                            (!form.company || row.company?.trim().toLowerCase() === form.company?.trim().toLowerCase()) &&
                            (!form.dataCenter || row.dataCenter?.trim().toLowerCase() === form.dataCenter?.trim().toLowerCase()) &&
                            (!form.certifications || row.certifications?.toLowerCase().includes(form.certifications?.trim().toLowerCase())) &&
                            (!form.mwCapacity || Number(row.capacity) === Number(form.mwCapacity.trim()))
                            );
                        });

                        setResults(matches);
                        setSearchDone(true);
                        setIsLoading(false);
                        console.log("Form submitted: ", form);
                        }, 1000);
        }
        return (
            <>
                <Form
                    form={form}
                    errors={errors}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
                {isLoading && (
                    <div style={{ marginTop: "20px"}}>
                        <LinearWithValueLabel />
                    </div> 
                )}
                {searchDone &&!isLoading && <ResultsList results={results} />}
            </>
        );
    }
    export default FormContainer;