export interface Trip {
    _id: string;
    code: string;
    name: string;
    length: string; // e.g., "5 days, 4 nights"
    start: Date; // ISO date string
    resort: string; 
    perPerson: string; // e.g., "$1,200 USD"
    image: string; // URL to the trip image
    description: string;
}