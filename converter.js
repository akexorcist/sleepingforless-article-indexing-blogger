exports.convert = (posts, labels, excludedTitles = []) => {
    let html = labels.map(label => {
        let filteredPosts = posts
            .filter(post => !excludedTitles.includes(post.title))
            .filter(post => post.labels != undefined && post.labels.includes(label))
            .sort(publishedDateSort)
        return toHtml(label, filteredPosts)
    }).reduce((acc, value) => acc + value, '')
    return html
}

const toHtml = (title, posts) => {
    let html = ''
    html += '<h2>' + title + '</h2>\n\r'
    html += posts.reduce(reduceToHtml, '')
    html += '<br />\n\r'
    return html
}

const reduceToHtml = (acc, value) => {
    return acc + '• <a href="' + value.url.replace('http://', 'https://') + '" target="_blank">' + value.title + '</a><br />\n\r'
}

const publishedDateSort = (a, b) => {
    if (a.published > b.published) {
        return -1
    } else if (a.published < b.published) {
        return 1
    } else {
        return 0
    }
}