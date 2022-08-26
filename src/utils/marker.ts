
export interface Marker {
    manager_id?: string;
    system_id: string;
    location: {
        lat: number,
        lng: number
    },
    description: string;
    name: string;
    notes: string;
    phone?: string;
    email?: string;
}