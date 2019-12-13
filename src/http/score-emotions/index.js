const request = require("request")
const { FACE_API_KEY, FACE_API_URL } = process.env

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
}

function getEmotions(image, callback) {
  const params = {
    returnFaceAttributes: "emotion"
  }

  const options = {
    uri: FACE_API_URL,
    qs: params,
    body: image,
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": FACE_API_KEY
    }
  }

  request.post(options, (error, response, body) => {
    if (error) {
      console.log("Error: " + error)
      return callback(error)
    }

    callback(null, JSON.parse(body))
  })
}

module.exports = function(req) {
  const image = req.body

  getEmotions(image, (err, response) => {
    if (err) {
      return {
        status: 400,
        headers,
        body: "Please pass a name on the query string or in the request body"
      }
    }

    return {
      status: 200,
      headers,
      body: JSON.stringify(response)
    }
  })
}
