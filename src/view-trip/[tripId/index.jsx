import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/custom/header';
import { useParams } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Footer from '../components/Footer';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        const getTripData = async () => {
            if (!tripId) return;

            try {
                console.log("Trip ID:", tripId);
                const q = query(
                    collection(db, 'AITrips'),
                    where('id', '==', tripId) //fixed path
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const docSnap = querySnapshot.docs[0];
                    const tripData = docSnap.data();
                    tripData.tripId = docSnap.id; // optional
                    console.log("Trip found:", tripData);
                    setTrip(tripData);
                } else {
                    console.warn("No document found for:", tripId);
                    toast.error('No trip found!');
                }
            } catch (error) {
                console.error("Error fetching trip:", error);
                toast.error('Failed to fetch trip. Try again later.');
            }
        };

        getTripData();
    }, [tripId]);

    return (
        <div>
            <Header />
            <div className='p-10 md:px-20 lg:px-44 xl:px-54'>
                {/* Information Section */}
                <InfoSection trip={trip} />
                {/* Hotels Section */}
                <Hotels trip={trip} />
                {/* Daily Plan */}
                <PlacesToVisit trip = {trip} />
                {/* Footer */}
                <Footer trip = {trip} />
                {/* Daily Plan and Footer can go here */}
            </div>
        </div>
    );
}

export default Viewtrip;
