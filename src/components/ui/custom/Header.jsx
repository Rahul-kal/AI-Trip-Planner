<<<<<<< HEAD
    import React from 'react'
    import { Button } from '../button'
    function Header() {
    return (
        <div className='p-2 shadow-sm flex justify-between items-center px-5'>
            <img src='/logo.svg' />
            <div>
                <Button>Sign In</Button>
            </div>
        </div>
    )
    }

    export default Header
=======
    import React, { useEffect, useState } from "react";
    import { Button } from "../button";
    import { Popover, PopoverTrigger, PopoverContent } from "../popover";
    import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    } from "@/components/ui/dialog";
    import { googleLogout, useGoogleLogin } from "@react-oauth/google";
    import axios from "axios";
    import { FcGoogle } from "react-icons/fc";

    function Header() {
    const [openDialog, setOpenDialog] = useState(false);
    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem("user"))
    );

    useEffect(() => {
        if (user) {
        console.log("Logged in user:", user);
        }
    }, [user]);

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => fetchUserProfile(tokenResponse.access_token),
        onError: (error) => console.error("Login Failed:", error),
    });

    const fetchUserProfile = async (accessToken) => {
        try {
        const res = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
            {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
            }
        );
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        setOpenDialog(false);
        } catch (error) {
        console.error("Error fetching profile:", error);
        }
    };

    const handleLogout = () => {
        googleLogout();
        localStorage.clear();
        setUser(null);
        window.location.reload();
    };

    return (
        <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
            <img
            src="/Travel-World.jpeg"
            alt="Travel World Logo"
            className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-bold text-gray-800 tracking-wide">
            Travel<span className="text-orange-500">World</span>
            </span>
        </div>

        {/* User Interaction Section */}
        <div className="flex items-center space-x-4">
            {user ? (
            <>
                <a href="/my-trips">
                <Button
                    variant="outline"
                    className="rounded-full px-5 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                    My Trips
                </Button>
                </a>
                <Popover>
                <PopoverTrigger>
                    <img
                    src={user?.picture}
                    alt="User"
                    className="h-10 w-10 rounded-full object-cover cursor-pointer border border-gray-300"
                    />
                </PopoverTrigger>
                <PopoverContent className="p-4 text-center">
                    <h2
                    className="cursor-pointer text-sm font-medium text-red-600 hover:underline"
                    onClick={handleLogout}
                    >
                    Logout
                    </h2>
                </PopoverContent>
                </Popover>
            </>
            ) : (
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
            )}
        </div>

        {/* Google Sign-In Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="max-w-sm rounded-2xl px-6 py-8">
            <DialogHeader className="flex flex-col items-center text-center">
                <img src="/logo.svg" alt="Logo" className="w-48 h-20 mb-6" />
                <DialogTitle className="text-xl font-bold">
                Sign In With Google
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-500 mt-2 mb-6">
                Sign in securely using your Google account.
                </DialogDescription>
                <Button
                onClick={login}
                variant="outline"
                className="w-full flex items-center justify-center gap-3 text-base"
                >
                <FcGoogle className="text-xl" />
                Sign In With Google
                </Button>
            </DialogHeader>
            </DialogContent>
        </Dialog>
        </header>
    );
    }

    export default Header;
>>>>>>> d7177e3 (Versel.json)
