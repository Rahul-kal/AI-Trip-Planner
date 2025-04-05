    import React, { useEffect, useState } from "react";
    import Header from "../components/ui/custom/header";
    import GooglePlacesAutocomplete from "react-google-places-autocomplete";
    import { SelectBudgetOptions, SelectTravelsList } from "../constants/options";
    import { Button } from "../components/ui/button";

    function CreateTrip() {
    const [place, setPlace] = useState();
    
    const [formData, setFormData] = useState([]);

    const handleInputChange=(name,value)=>{
        if(name =='noOfDays'&& value>5){
            console.log("Please enter Trip Days less than 5");
            return ;
        }

        setFormData({
            ...formData,
            [name]:value,
        })
    }
    useEffect(() => {
        console.log(formData);
    },[formData])

    const onGenerateTrip=()=>{
        if(formData?.noOfDays>5){
            return ;
        }
        console.log(formData);
    }


    return (
        <div>
        <div>
            <Header />
        </div>
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            <h2 className="font-bold text-3xl">
            Tell us your travel preferences 🏕️🌴
            </h2>
            <p className="mt-3 text-gray-500 text-xl">
            Just provide some basic information, and our trip planner will
            generate a customized itinerary based on your preferences.
            </p>
            <div className="mt-20">
            <div className="mt-20 flex flex-col gap-1">
                <h2 className="text-xl my-3 font-medium">
                What is destination of choice ?
                </h2>
                <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                    place,
                    onChange: (v) => {
                    setPlace(v);
                    handleInputChange('location',v);
                    },
                }}
                />
            </div>
            <div className="mt-6">
                <h2 className="text-xl mb-2 font-medium text-gray-800">
                How many days are you planning your trip?
                </h2>
                <input
                type="number"
                placeholder="Ex. 3"
                className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f56551] focus:border-transparent transition"
                onChange={(e)=>handleInputChange('noOfDays',e.target.value)}
                />
            </div>
            </div>
            <h2 className="text-xl my-3 font-medium">What is Your Budget ?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
                <div
                key={index}
                onClick={()=>handleInputChange('budget',item.title)}
                className={`p-5 border rounded-xl hover:shadow-lg transition-all cursor-pointer bg-white hover:bg-gray-50
                ${formData?.budget==item.title&&'shadow-lg border-black'}
                `}>
                <div className="flex items-center gap-3 mb-2 text-4xl">
                    {item.icon}
                <h2 className="text-lg font-bold">{item.title}</h2>
                </div>
                <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
            ))}
            </div>

            <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next adventure?</h2>
            <div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
                <div
                key={index}
                // adding the onclick feature
                onClick={()=>handleInputChange('traveler',item.people)}
                className={`p-5 border rounded-xl hover:shadow-lg transition-all cursor-pointer bg-white hover:bg-gray-50
                    ${formData?.traveler==item.people&&'shadow-lg border-black'}
                    `}
                >
                <div className="flex items-center gap-3 mb-2 text-4xl">
                    {item.icon}
                    <h2 className="text-lg font-bold">{item.title}</h2>
                </div>
                <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
            ))}
            </div>
        </div>
        <div className="my-10 justify-end flex">
            <Button onClick={onGenerateTrip}>Generate Trip</Button>
        </div>
        </div>
    );
    }

    export default CreateTrip;
