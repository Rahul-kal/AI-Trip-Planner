import React, { useEffect, useState } from "react";
import Header from "../components/ui/custom/Header";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { chatSession } from "../service/AIModal";
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore"; 
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { db } from "../service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    if (window.google && window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Add this env variable
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-btn"),
        { theme: "outline", size: "large", width: "100%" }
      );
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${response.credential}`
      );
      console.log("User Profile:", res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setOpenDailog(false);
      onGenerateTrip();
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

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

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formData.location.label)
      .replace("{totalDays}", formData.noOfDays)
      .replace("{traveler}", formData.traveler)
      .replace("{budget}", formData.budget);

    try {
      setIsLoading(true);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result?.response?.text();
      setLoading(false);
      SaveAiTrip(responseText);
      toast("Trip generated successfully!");
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Something went wrong. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  return (
    <div>
      <Header />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        {/* rest of your UI unchanged */}

        {/* Generate Trip button */}
        <div className="my-10 justify-end flex">
          <Button disabled={isLoading} onClick={onGenerateTrip}>
            {isLoading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin text-white" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        {/* Google Sign-In Dialog */}
        <Dialog open={openDailog}>
          <DialogContent className="max-w-sm rounded-2xl px-6 py-8">
            <DialogHeader className="flex flex-col items-center text-center">
              <img src="/logo.svg" alt="Logo" className="w-63 h-24 mb-6" />
              <DialogTitle className="text-xl font-bold mt-2">
                Sign In With Google
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-2 mb-6">
                Sign in to the app using your Google account securely.
              </DialogDescription>
              <div id="google-signin-btn" className="w-full" />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
