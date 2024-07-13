// var myHeaders = new Headers();
// 		myHeaders.append("Authorization",`Bearer ${apiKey}`)

// 		var requestOptions = {
// 			method : 'POST',
// 			headers : myHeaders,
// 			redirect : 'follow'
// 		};
// 		fetch("https://api.openai.com/v1/chat/completions",requestOptions)
// 		.then(response => response.json())
// 		.then(result => console.log(result))
// 		.catch(error => console.log('error',error));


const axios = require("axios");
require('dotenv').config();

const apikey = process.env.CHATGPT_KEY;
const urls = {
  openAi: {
    url: 'https://api.openai.com',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apikey}`,
    }
  },

}
const req = ({
  fullUrl,
  base,
  method = 'GET',
  uri = '',
  data,
  signal = new AbortController().signal,
  withCredentials = true,
  headers = null
}) => {
  const url = fullUrl || `${urls[base].url}/${uri}`;
  const payload = {
    method,
    withCredentials,
    url,
    signal,
    ...['post', 'patch'].includes(method.toLowerCase()) && { data },
    headers: {
      ...headers && { ...headers },
      ...urls?.[base]?.headers && { ...urls[base].headers }
    }
  };
  return axios(payload);
};

module.exports = {
  req
};