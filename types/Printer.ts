// Type definition for the Printer object
// This stores information about a 3D printer 
// that admin users can edit in the system
export interface Printer {
    id: string; // unique ID of the individual printer
    name: string; // name for the printer
    description: string; // Description of the printer
    imageUrl: string; // URL for the image of the printer
}
