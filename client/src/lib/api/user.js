import client from "./client";

export const registerPhoneNumber = (phoneNumber) => {
    client.post('/userPhoneNumber', { phoneNumber });
}
export const setPasscode = (passcode) => {
    client.post('/setPasscode', { passcode });
}

export const alert = () => {
    client.post('/alert');
}