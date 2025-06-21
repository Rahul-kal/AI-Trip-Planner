<<<<<<< HEAD
    export const SelectTravelsList = [
        {
        id: 1,
        title: 'Just Me',
        desc: 'A solo traveler in exploration',
        icon: '✈️',
        people: '1 Person',
        },
        {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers exploring together',
        icon: '🥂',
        people: '2 People',
        },
        {
        id: 3,
        title: 'Family',
        desc: 'A family adventure awaits',
        icon: '🏡',
        people: '3 to 5 People',
        },
        {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        icon: '⛵',
        people: '5 to 10 People',
        },
    ];
    
    export const SelectBudgetOptions = [
        {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
        },
        {
        id: 2,
        title: 'Moderate',
        desc: 'Balanced budget with comfort',
        icon: '💰',
        },
        {
        id: 3,
        title: 'Luxury',
        desc: "Don't worry about the cost — it's all about experience",
        icon: '💸',
        },
    ];
    
    // Prompt format for AI travel generation
    export const AI_PROMPT =
        'Generate a travel plan for the location: {location}, for {totalDays} days for {traveler}, with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price ,hotel image url, geo coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.';
    
=======
export const SelectTravelsList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'⛵',
        people:'5 to 10 People'
    },
]


export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸',
    },
]


export const AI_PROMPT='Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates,Place address, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'
>>>>>>> d7177e3 (Versel.json)
