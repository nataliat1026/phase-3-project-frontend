import React from 'react';
import BlogPost from './BlogPost';

function Blog({ posts}) {


    return (
        <div>
            <div>{(posts.map((post) => <BlogPost key = {post.id} post = {post} />))}</div>
        </div>
    )
}

export default Blog
