import { getDistanceFromLatLonInKm } from "../utils/distance";
describe("distance", ()=>{
    it("converts latitude and longitude into kilometers", () =>{
        const lat1 = 51.5074;
        const lat2 = -0.1278;
        const lon1 = 48.8566;
        const lon2 = 2.3522;

        const distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);

        //distance is roughtly 343km
        expect(distance).toBeGreaterThan(340);


    });
});