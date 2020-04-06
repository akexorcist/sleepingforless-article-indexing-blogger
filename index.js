const { getTotalPostCount, getPosts } = require('./repo')
const { convert } = require('./converter')

const indexing = async() => {
    try {
        let total = await getTotalPostCount()
        let posts = await getPosts(total)
        let html = convert(posts)
        console.log(html)
    } catch (err) {
        console.log('Something went wrong : ' + err)
    }
}

indexing()