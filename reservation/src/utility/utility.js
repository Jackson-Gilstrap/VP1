//put resuable functions here
import axios from "axios";
//axios reservation post

export default async function createReservation (url, data) {
    try {
        const response = await axios.post(url, data);
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }

}