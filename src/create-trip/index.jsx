    import React, { useEffect, useState } from "react";
    import Header from "../components/ui/custom/header";
    import GooglePlacesAutocomplete from "react-google-places-autocomplete";
    import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "../constants/options";
    import { Button } from "../components/ui/button";
    import { toast } from "sonner";
    import { chatSession } from "../service/AIModal";
    import { FcGoogle } from "react-icons/fc";
    import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    } from "@/components/ui/dialog";
    import { useGoogleLogin } from "@react-oauth/google";
    import axios from "axios";

    function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [openDailog, setOpenDailog] = useState(false);

    const handleInputChange = (name, value) => {
        if (name === "noOfDays" && value > 5) {
        toast("Please enter Trip Days less than or equal to 5");
        return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        console.log("Form data updated:", formData);
    }, [formData]);

    const Login = useGoogleLogin({
        onSuccess: (tokenInfo) => GetUserProfile(tokenInfo.access_token),
        onError: (error) => console.log("Google Login Error:", error),
    });

    const onGenerateTrip = async () => {
        const user = localStorage.getItem("user");
        if (!user) {
        setOpenDailog(true);
        return;
        }

        if (
        !formData?.location?.label ||
        !formData?.noOfDays ||
        !formData?.budget ||
        !formData?.traveler
        ) {
        toast("Please fill all details");
        return;
        }

        const FINAL_PROMPT = AI_PROMPT
        .replace("{location}", formData.location.label)
        .replace("{totalDays}", formData.noOfDays)
        .replace("{traveler}", formData.traveler)
        .replace("{budget}", formData.budget);

        console.log("Sending prompt:", FINAL_PROMPT);

        try {
        setIsLoading(true);
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        const responseText = await result?.response?.text();
        console.log("AI Response:", responseText);
        toast("Trip generated successfully!");
        } catch (error) {
        console.error("Error generating trip:", error);
        toast("Something went wrong. Try again later.");
        } finally {
        setIsLoading(false);
        }
    };

    const GetUserProfile = async (access_token) => {
        try {
        const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
            {
            headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: "application/json",
            },
            }
        );
        console.log("User Profile:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDailog(false);
        onGenerateTrip();
        } catch (error) {
        console.error("Error fetching user info:", error);
        }
    };

    return (
        <div>
        <Header />
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
            <p className="mt-3 text-gray-500 text-xl">
            Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>

            <div className="mt-20">
            {/* Destination */}
            <div className="mt-10 flex flex-col gap-1">
                <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
                <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                    place,
                    onChange: (v) => {
                    setPlace(v);
                    handleInputChange("location", v);
                    },
                }}
                />
            </div>

            {/* Days */}
            <div className="mt-6">
                <h2 className="text-xl mb-2 font-medium text-gray-800">How many days are you planning your trip?</h2>
                <input
                type="number"
                placeholder="Ex. 3"
                min="1"
                max="5"
                className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f56551] focus:border-transparent transition"
                onChange={(e) => handleInputChange("noOfDays", parseInt(e.target.value))}
                />
            </div>

            {/* Budget */}
            <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                {SelectBudgetOptions.map((item, index) => (
                <div
                    key={index}
                    onClick={() => handleInputChange("budget", item.title)}
                    className={`p-5 border rounded-xl hover:shadow-lg transition-all cursor-pointer bg-white hover:bg-gray-50 ${
                    formData?.budget === item.title ? "shadow-lg border-black" : ""
                    }`}
                >
                    <div className="flex items-center gap-3 mb-2 text-4xl">
                    {item.icon}
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    </div>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                ))}
            </div>

            {/* Traveler */}
            <h2 className="text-xl my-3 font-medium">
                Who do you plan on traveling with on your next adventure?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                {SelectTravelsList.map((item, index) => (
                <div
                    key={index}
                    onClick={() => handleInputChange("traveler", item.people)}
                    className={`p-5 border rounded-xl hover:shadow-lg transition-all cursor-pointer bg-white hover:bg-gray-50 ${
                    formData?.traveler === item.people ? "shadow-lg border-black" : ""
                    }`}
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

            {/* Generate Button */}
            <div className="my-10 justify-end flex">
            <Button onClick={onGenerateTrip} disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Trip"}
            </Button>
            </div>

            {/* Sign-In Dialog */}
            <Dialog open={openDailog}>
            <DialogContent className="max-w-sm rounded-2xl px-6 py-8">
                <DialogHeader className="flex flex-col items-center text-center">
                <img src="/logo.svg" alt="Logo" className="w-63 h-24 mb-6" />
                <DialogTitle className="text-xl font-bold mt-2">Sign In With Google</DialogTitle>
                <DialogDescription className="text-sm text-gray-500 mt-2 mb-6">
                    Sign in to the app using your Google account securely.
                </DialogDescription>

                <Button
                    onClick={Login}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-3 text-base"
                >
                    <FcGoogle className="text-xl" />
                    Sign In With Google
                </Button>
                </DialogHeader>
            </DialogContent>
            </Dialog>
        </div>
        </div>
    );
    }

    export default CreateTrip;
