import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
    const itinerary = trip?.tripData?.dailyItinerary || [];

    return (
        <div className="mt-14">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🗺️ Places To Visit</h2>
            {itinerary.length > 0 ? (
                itinerary.map((item, dayIndex) => (
                    <div key={dayIndex} className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Day {item.day}</h3>
                        {item.activities?.map((place, index) => (
                            <div key={index} className="p-4 border rounded-xl bg-white shadow-sm mb-3">
                                <h4 className="text-lg font-bold text-orange-600">{place.bestTimeToVisit}</h4>

                                <PlaceCardItem place={place} />
                
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No itinerary available.</p>
            )}
        </div>
    );
}

export default PlacesToVisit;
