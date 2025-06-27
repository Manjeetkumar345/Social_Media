// import bcrypt from "bcryptjs";
// import CryptoJS from "crypto-js";

//  // 1. Create a secure fallback key
// const generateFallbackKey = () => {
//   return CryptoJS.SHA256(
//     window.location.hostname + 
//     navigator.userAgent + 
//     "your-secret-phrase"
//   ).toString();
// };


// const SECRET_KEY = process.env.APP_SECRET_KEY || generateFallbackKey();


// const verifyCredential = (id, password) => {
//     try {        
//         // Decryption
//         // const 
//         const bytes = CryptoJS.AES.decrypt(password, SECRET_KEY);
//         const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        
//         // Compare hashed passwords
//         return bcrypt.compareSync(password, decryptedData.hashPassword);
//     } catch (error) {
//         console.error("Decryption Failed", error);
//         return false;
//     }
// };

// const createCredential = (id, password) => {
//     try {
//         // Generate salt per user (critical security fix)
//         const salt = bcrypt.genSaltSync(10);
//         const hashPassword = bcrypt.hashSync(password, salt);
        
//         // Encryption
//         const encryptedData = CryptoJS.AES.encrypt(
//             JSON.stringify({ id, hashPassword, salt }),
//             SECRET_KEY
//         ).toString();
//         return encryptedData;
//     } catch (error) {
//         console.error("Registration failed", error);
//         return false;
//     }
// };

// const Credentials = ({ purpose, id, password }) => {
//     if (purpose === "login") {
//         return verifyCredential(id, password);
//     } else {
//         return createCredential(id, password);
//     }
// };

// module.exports ={
//     Credentials
// }