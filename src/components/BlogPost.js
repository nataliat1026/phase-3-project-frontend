import React from 'react'

function BlogPost({ post }) {
    const { title, content } = post;

    return (
        <div className = 'blogWrapper'>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    )
}

export default BlogPost