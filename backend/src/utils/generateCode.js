import crypto from 'crypto';

const generateCode = () => {
    //random generate 6 digit code
    // console.log(crypto.randomBytes(6).toString('base64').slice(0,6));


const mainString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

let shortCode ="";

for (let i=0;i<6;i++){
  shortCode += mainString[Math.floor(Math.random() * mainString.length)];
}

return shortCode;
};

export default generateCode;    
