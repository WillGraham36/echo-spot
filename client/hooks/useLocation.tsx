import { GeoLocation } from '@/types'


/**
 * 
 * @returns {Promise<GeoLocation>} - Returns a promise that resolves to the user's location
 * 
 * @returns GeoLocation: {1000, 1000} --- Returns {1000, 1000} if the user's location could not be found
 */
const useLocation = async (): Promise<GeoLocation> => {

    //ensures that the code runs on the client and never server
    if (typeof window === 'undefined') {
        return {
            lat: 1000,
            long: 1000
        }
    }

    const locationPromise = () => new Promise<{ location: GeoLocation }>((resolve, reject) => {
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

export default useLocation