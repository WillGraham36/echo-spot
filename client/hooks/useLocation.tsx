import { GeoLocation } from '@/types'


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
                    lat: 0,
                    long: 0
                }
            });
        });
    });

    return (await locationPromise()).location;
}

export default useLocation