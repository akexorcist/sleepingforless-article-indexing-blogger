const { getBlogInfo, getPosts } = require('./api')
require('dotenv').config()

exports.getTotalPostCount = async() => {
    let response = await getBlogInfo()
    let json = await response.json()
    return json.posts.totalItems
}

exports.getPosts = async(total) => {
    let posts = []
    let pageToken = undefined
    do {
        let { newPosts, nextPageToken } = await getPostSet(pageToken)
        posts = posts.concat(newPosts)
        pageToken = nextPageToken
        let progress = (posts.length * 100 / total)
        updateProgress('[' + progress + '%] Collected ' + posts.length + ' of ' + total + ' posts')
    }
    while (pageToken);
    return posts
}

const getPostSet = async(pageToken) => {
    let response = await getPosts(pageToken)
    let json = await response.json()
    return {
        newPosts: json.items,
        nextPageToken: json.nextPageToken
    }
}

const updateProgress = (message) => {
    // console.log(message)
}