import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  const hotels = trip?.tripData?.hotelOptions || [];

  return (
    <div className="mt-14">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">🏨 Recommended Stays</h2>

      {hotels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <HotelCardItem hotel={hotel}/>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hotel recommendations available.</p>
      )}
    </div>
  );
}
 
export default Hotels;
