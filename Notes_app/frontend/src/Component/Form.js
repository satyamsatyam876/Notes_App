import { useState } from "react"

export default function Form({handleSubmit}){
    const [content,setContent] = useState("");
    const [tag,setTag] = useState("");
    const [title,setTitle] = useState("");

    function handleChangeForContent(e){
        e.preventDefault()
        const value = e.target.value;
        setContent(value);
    }
    function handleChangeForTag(e){
        e.preventDefault()
        const value = e.target.value;
        setTag(value);
    }
    function handleChangeForTitle(e){
        e.preventDefault()
        const value = e.target.value;
        setTitle(value);
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        handleSubmit(title,content, tag);
        setContent("");
        setTag("");
        setTitle("");
      }
    return (
        <>
        <h1>Input your Notes Here</h1>
        <form style={{display:"flex", flexDirection:"column"}} onSubmit={handleFormSubmit}>
        Title:
                    <input type="text" placeholder="Title" value={title} onChange={handleChangeForTitle} required/>
            
            Notes:
                    <input type="text" placeholder="Notes" value={content} onChange={handleChangeForContent} required/>
                Tag:
                <input type= "text" placeholder="Tag" value={tag} onChange={handleChangeForTag} required/>
            
            <input type="submit" value="Add"/>
        </form>
        </>
    )
}