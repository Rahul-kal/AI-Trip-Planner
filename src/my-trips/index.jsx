    import React, { useEffect, useState } from 'react';
    import Header from '../components/ui/custom/Header';
    import { useNavigate } from 'react-router-dom';
    import { collection, query, where, getDocs } from 'firebase/firestore';
    import { db } from '@/service/firebaseConfig';
    import UserTripCardItem from './components';

    function MyTrips() {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.email) {
            console.warn('No user or email found in localStorage');
            navigate('/');
            return;
        }

        try {
            const q = query(
            collection(db, 'AITrips'),
            where('userEmail', '==', user.email) // ✅ correct path
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
            console.log('No matching trips found for:', user.email);
            setUserTrips([]);
            } else {
            const trips = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log('Trips found:', trips);
            setUserTrips(trips);
            }
        } catch (error) {
            console.error('Error fetching user trips:', error);
        }
        };

        GetUserTrips();
    }, [navigate]);

    return (
        <div>
            <Header />
            <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>

            <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
                {userTrips.length > 0 ? (
                userTrips.map((trip, index) => (
                    <UserTripCardItem trip={trip} key={index} />
                ))
                ) : (
                [1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div
                    key={index}
                    className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'
                    ></div>
                ))
                )}
            </div>
            </div>
        </div>
        );
        }
    export default MyTrips;
