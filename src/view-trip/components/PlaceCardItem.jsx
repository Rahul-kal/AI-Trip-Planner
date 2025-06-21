import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PHOTO_REF_URL } from "../../service/GlobalApi";
import { GetPlaceDetails } from "../../service/GlobalApi";

function PlaceCardItem({ place }) {
        const [PhotoUrl,setPhotoUrl] =useState();    
        useEffect(() => {
                if (place) {
                GetPlacePhoto();
                }
            }, [place]);
        
            const GetPlacePhoto = async() => {
                
                const data = {
                    textQuery: place?.placeName,
                };
                const response = await GetPlaceDetails(data);
                console.log("Place photo response:", response.data.places[0].photos[3].name);
        
                const PhotoUrl  = PHOTO_REF_URL.replace('{NAME}',response.data.places[0].photos[3].name);
                setPhotoUrl(PhotoUrl);
                }
            
    return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName || '')}`} target = "_blank">
        <div className="flex gap-4 items-start p-4 rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300 mb-4">
            <img
                src={PhotoUrl}
                alt={place?.placeName || "Place"}
                className="w-[130px] h-[130px] rounded-xl object-cover"
                />
            <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{place.placeName}</h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{place.placeDetails}</p>
                <div className="mt-2 space-y-1 text-sm text-gray-700">
                    <p>🕙 <span className="font-medium">{place.travelTime || "N/A"}</span></p>
                    <p>🎟️ <span className="font-medium">{place.ticketPricing || "N/A"}</span></p>
                </div>
            </div>
        </div>
        </Link>
    );
}

export default PlaceCardItem;
