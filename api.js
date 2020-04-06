const fetch = require('node-fetch')
require('dotenv').config()

exports.getPosts = (pageToken = undefined) => {
    const apiKey = process.env.API_KEY
    const blogId = process.env.BLOG_ID
    const maxResults = 500
    const fetchBodies = false
    const fetchImages = false
    const params = new URLSearchParams()
    params.append('key', apiKey)
    params.append('fetchBodies', fetchBodies)
    params.append('fetchImages', fetchImages)
    params.append('maxResults', maxResults)
    if (pageToken) {
        params.append('pageToken', pageToken)
    }
    const queryParams = params.toString()
    const url = 'https://www.googleapis.com/blogger/v3/blogs/' + blogId + '/posts/?' + queryParams
    return fetch(url)
}
exports.getBlogInfo = () => {
    const apiKey = process.env.API_KEY
    const blogId = process.env.BLOG_ID
    const params = new URLSearchParams()
    params.append('key', apiKey)
    const queryParams = params.toString()
    const url = 'https://www.googleapis.com/blogger/v3/blogs/' + blogId + '/?' + queryParams
    return fetch(url)
}