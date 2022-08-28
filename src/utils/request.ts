
export interface RequestToMarker {
    firstName: string;
    lastName: string;
    phone?: string;      
    email?: string;
    _id?:string,
    display_name: string;
    status?: string;
    system_id: string;
    location: {
        lat: number,
        lng: number
    }, 
}

