// a couple of functions that we will reuse always  in our application
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // //'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc13'
    // 5ed6604591c37cdc054bcc13
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; // the resolved value of the promise that getJSON returns => returns A PRMOMISE =>
    // in the model.js we have to await that promise and store the resolved value into the data variable
  } catch (err) {
    throw err; //
  }
}; // in model.js loadRecipe it's an async function calling another async function => both of them will return A PROMISE => the fulfilled promise from the getJSON has to be stored and returned into the data variable => data being a FULLFILD promise it has to be awaited into the loadRecipe function and stored into data variable

/*export const getJSON = async function (url) {};

export const sendJSON = async function (url, uploadData) {
  try {
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
}; */
