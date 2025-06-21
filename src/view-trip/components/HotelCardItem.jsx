    import React, { useEffect, useState } from "react";
    import { PHOTO_REF_URL } from "../../service/GlobalApi";
    import { GetPlaceDetails } from "../../service/GlobalApi";

    function HotelCardItem({ hotel }) {

        const [PhotoUrl,setPhotoUrl] =useState();    
        useEffect(() => {
                if (hotel) {
                GetPlacePhoto();
                }
            }, [hotel]);
        
            const GetPlacePhoto = async () => {
                try {
                const data = {
                    textQuery: hotel?.hotelName,
                };
                const response = await GetPlaceDetails(data);
                console.log("Place photo response:", response.data.places[0].photos[3].name);
        
                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',response.data.places[0].photos[3].name);
                setPhotoUrl(PhotoUrl);
        
                } catch (error) {
                console.error("Error fetching place photo:", error);
                }
            };
        
    return (
        <div>
        <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            hotel.hotelName + " " + hotel.hotelAddress || ""
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 block"
        >
            <img
            src={PhotoUrl}
            alt={hotel?.hotelName || "Hotel Image"}
            className="h-[180px] w-full object-cover"
            />
            <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-800">
                {hotel?.hotelName || "Unnamed Hotel"}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
                {hotel?.hotelAddress || "No address available"}
            </p>
            <p className="text-sm text-gray-600 line-clamp-3">
                {hotel?.description}
            </p>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
                <span className="font-medium">💸 {hotel?.price || "N/A"}</span>
                <span className="font-medium">⭐ {hotel?.rating || "N/A"}</span>
            </div>
            </div>
        </a>
        </div>
    );
    }

    export default HotelCardItem;
