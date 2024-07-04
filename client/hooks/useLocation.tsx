import { GeoLocation } from '@/types'


/**
 * 
 * @returns {Promise<GeoLocation>} - Returns a promise that resolves to the user's location
 * 
 * @returns GeoLocation: {-1, -1} --- Returns {-1, -1} if the user's location could not be found
 */
const useLocation = async (): Promise<GeoLocation> => {

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
                    lat: -1,
                    long: -1
                }
            });
        });
    });

    
    return (await locationPromise()).location;
}

export default useLocation