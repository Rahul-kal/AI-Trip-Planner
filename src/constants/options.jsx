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
    