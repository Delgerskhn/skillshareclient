import { useRouter } from 'next/router'
import * as React from 'react'
import { useState } from 'react'
import { createBlog, getWriterBlog, publishBlog, updateBlog } from '../api/blogs'
import { populateBlogModel } from '../helpers/populate-model'
import { constBlog } from '../shared/constants'
import { useAppContext } from './app'


const EditorContext = React.createContext()
function useEditorContext() {
    const context = React.useContext(EditorContext)
    if (!context) {
        throw new Error(`useEditorContext must be used within a EditorProvider`)
    }
    return context
}
function EditorProvider(props) {
    const [blog, setBlog] = useState({});
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState(null);
    const [autoSaveAlertVisible, setVisible] = useState(false);
    const router = useRouter();
    const { setIsLoading, setErrorMsg } = useAppContext();

    //save tag state
    const onTagSelect = tags => {
        console.log(tags);

        setTags(tags);
    };

    const saveDraft = async () => {
        let populatedBlog = populateBlogModel(content, tags);
        populatedBlog.pk = blog.pk;
        if (blog?.pk) {
            await updateBlog(populatedBlog);
        } else {
            var res = await createBlog(populatedBlog);
            if (res?.content) res.content = JSON.parse(res.content);
            setBlog(res);
        }
        console.log(populatedBlog);
        setVisible(true);
    };

    //save content state
    const onNonInteractiveEditor = async content => {
        console.log("no interact", content);
        setContent(content);
    };

    //fetch model blog
    const fetchBlog = async (blogPk) => {
        let blogToStub = {};

        if (blogPk) {
            setIsLoading(true);
            blogToStub = await getWriterBlog(blogPk);
            setIsLoading(false);
        }
        if (blogToStub?.content)
            blogToStub.content = JSON.parse(blogToStub.content);
        setBlog(blogToStub);
    };

    const publish = async () => {
        setIsLoading(true)
        var res = await publishBlog(blog.pk)
        setIsLoading(false)
        if (res.Ok) router.push('/account/dashboard?status=' + constBlog.State.Pending)
        else setErrorMsg(res.Message)
    }

    //update model blog on content or tags change
    React.useEffect(
        () => {
            if (content || tags.length) saveDraft();
        },
        [content, tags]
    );

    const value = {
        autoSaveAlertVisible,
        setVisible,
        blog,
        onNonInteractiveEditor,
        onTagSelect,
        fetchBlog,
        publish
    };
    return <EditorContext.Provider value={value} {...props} />
}
export { EditorProvider, useEditorContext }