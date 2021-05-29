import Fetch from "../helpers/fetch"

let tags = []

const createTag = async (tag) => {
    tags.push(tag)
    try {
        return await Fetch('/writers/tag', 'post', tag, true)
    } catch {
    }
}

const fetchTags = async () => {
    try {
        tags = await Fetch('/readers/tags', 'get')
    } catch {
        tags = []
    }
}

const getTags = () => tags


export { getTags, createTag, fetchTags }