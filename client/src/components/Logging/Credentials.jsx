// import CryptoJS from "crypto-js";

// const verifyCredential = (id, password) => {
//     try {
//         // Retrieve encrypted data from storage
//         const encryptedData = localStorage.getItem(`user_${id}`);
//         if (!encryptedData) return false;
        
//         // Decryption
//         const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
//         const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        
//         // Compare hashed passwords
//         return bcrypt.compareSync(password, decryptedData.hashPassword);
//     } catch (error) {
//         console.error("Decryption Failed", error);
//         return false;
//     }
// };

// const encryptCredential = (username, password) => {
//     try {

//         const publicKey = import.meta.env.VITE_PUBLIC_KEY;
//         if(!publicKey) throw new Error("Missing Encryption Key");

//         const encrypted = {
//             username : CryptoJS.AES.encrypt(username,publicKey).toString(),
//             password : CryptoJS.AES.encrypt(password,publicKey).toString(),
//             timeStamp:Date.now() // Prevent Replay Attack
//         }

//         return encrypted;
//     } catch (error) {
//         console.error("Encryption failed", error);
//         return null;
//     }
// };

// const Credentials = ({ id, password }) => {
//         return encryptCredential(id, password);
// };

// export default Credentials;