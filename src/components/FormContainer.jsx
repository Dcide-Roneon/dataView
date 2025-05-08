// pure logic, state, validation, events
import React, { useState , useEffect} from "react";
import {
    isValidCapacity,
    isValidLatitude,
    isValidLongitude,
} from "../components/validation.js";
import Form from "./Form.jsx";
import {fetchAndParseCsv} from "./csv.js";
import ResultsTable from "./ResultsTable.jsx";
import LinearWithValueLabel from "./loading.jsx";
import ResultsList from "./resultList.jsx";


 const initialFormState = {
        company: " ",
        dataCenter: "",
        latitude:"",
        longitude: "",
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
        function handleSubmit(e) {
            e.preventDefault();
            const newErrors = {};
          
            if (!isValidLatitude(form.latitude)) {
              newErrors.latitude = "Latitude must be a number between -90 and 90.";
            }
            if (!isValidLongitude(form.longitude)) {
              newErrors.longitude = "Longitude must be a number between -180 and 180.";
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
                const matches = csvData.filter(row =>
                    Number(row.latitude) === Number(form.latitude.trim()) &&
                    Number(row.longitude) === Number(form.longitude.trim()) &&
                    (!form.company || row.company?.trim().toLowerCase() === form.company?.trim().toLowerCase()) &&
                    (!form.dataCenter || row.dataCenter?.trim().toLowerCase() === form.dataCenter?.trim().toLowerCase()) &&
                    (!form.certifications || row.certifications?.toLowerCase().includes(form.certifications?.trim().toLowerCase())) &&
                    (!form.mwCapacity || Number(row.mwCapacity) === Number(form.mwCapacity.trim()))
                  );                
              console.log("form.latitude:", form.latitude, "form.longitude:", form.longitude);
              console.log("typeof form.latitude:", typeof form.latitude); // debugging
              
              setResults(matches);
              setSearchDone(true); 
              setIsLoading(false);
              console.log("Form submitted: ", form);

            }, 1000); //loading delay
        

            
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