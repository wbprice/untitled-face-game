const got = require('got')

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
}

const {
  FACE_API_KEY,
  FACE_API_URL
} = process.env

async function detectEmotions(image) {
  const params = {
    returnFaceAttributes: "emotion"
  }

  const options = {
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": FACE_API_KEY
    },
    searchParams: params,
    body: image
  }

  const response = await got.post(FACE_API_URL, options)
  return JSON.parse(response["body"])
}

exports.handler = async function(req) {
  const body = Buffer.from(req.body, 'base64')

  try {
    const response = await detectEmotions(body)
    return {
      headers,
      body: JSON.stringify(response)
    }
  } catch (e) {
    // Error handling
    return {
      status: 500,
      headers,
      body: JSON.stringify({message: e.message})
    }
  }
}