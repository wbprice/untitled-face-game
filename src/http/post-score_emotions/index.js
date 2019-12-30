


exports.handler = async function(req) {

  const body = Buffer.from(req.body, 'base64')

  console.log(body)
  console.log(Object.keys(req))
  console.log(JSON.stringify(req.headers, null, 2))
  console.log(JSON.stringify(req.isBase64Encoded, null, 2))

  console.log("POST post-score_emotions")
  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: JSON.stringify({
      message: 'Hello from the post-score_emotions handler'
    })
  }
}