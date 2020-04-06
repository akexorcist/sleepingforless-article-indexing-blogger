exports.convert = (posts) => {
    const titles = [
        'Android Code',
        'Android Design',
        'Android Dev Tips'
    ]
    const excludes = [
        'สารบัญบทความแอนดรอยด์'
    ]
    let html = titles.map(title => {
        let filteredPosts = posts
            .filter(post => !excludes.includes(post.title))
            .filter(post => post.labels != undefined && post.labels.includes(title))
            .sort(publishedDateSort)
        return toHtml(title, filteredPosts)
    }).reduce((acc, value) => acc + value, '')
    return html
}

const toHtml = (titl, posts) => {
    let html = ''
    html += '<h2>' + titl + '</h2>\n\r'
    html += posts.reduce(reduceToHtml, '')
    html += '<br />\n\r'
    return html
}

const reduceToHtml = (acc, value) => {
    return acc + '• <a href="' + value.url + '" target="_blank">' + value.title + '</a><br />\n\r'
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