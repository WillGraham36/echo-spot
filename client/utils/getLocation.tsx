import Location from "@/types/Location";

/**
 * 
 * @returns {Promise<Location>} - Returns a promise that resolves to the user's location
 */
const getLocation = async (): Promise<Location> => {

    //ensures that the code runs on the client and never server
    if (typeof window === 'undefined') {
        return ({
            lat: 1000,
            long: 1000
        });
    }

    const locationPromise = () => new Promise<{ location: Location }>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve({
                location: {
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                }
            });
        }, () => {
            reject({
                location: {
                    lat: 1000,
                    long: 1000
                }
            });
        });
    });

    
    return (await locationPromise()).location;
}

export default getLocation;