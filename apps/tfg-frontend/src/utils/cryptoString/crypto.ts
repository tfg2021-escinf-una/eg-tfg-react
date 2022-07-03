import SimpleCrypto, { PlainData } from "simple-crypto-js";

export const objEncryptionDecryption = (encrypt : boolean = true, object : PlainData) : PlainData => {
  const crypto = new SimpleCrypto(process.env['NX_ENCRYPTION_KEY']);
  let data = null;

  if(encrypt){
    data = crypto.encrypt(object);
  }
  else {
    data = crypto.decrypt(object.toString());
  }

  return data;
}
