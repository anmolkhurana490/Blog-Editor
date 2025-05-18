import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../AppProvider';
import axios from 'axios'

import { MdOutlineRefresh } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const backendURL = import.meta.env.VITE_BACKEND_URL;

// Viewer component displays published and draft blogs.
// Separates published and draft blogs.
const Viewer = () => {
    const { setCurrBlogId } = useContext(AppContext);

    const [blogs, setBlogs] = React.useState([])
    const [drafts, setDrafts] = React.useState([])

    // State to manage loading state, to spin refresh icon.
    const [loading, setLoading] = useState(false)

    // Fetches blogs from backend API on mount and on refresh.
    const fetchBlogs = async () => {
        try {
            // Shows loading state during fetch.
            setLoading(true)
            const response = await axios.get(`${backendURL}/api/blogs`, { withCredentials: true });

            // filters blogs into published and draft categories.
            setBlogs(response.data.filter(blog => blog.status == 'published'))
            setDrafts(response.data.filter(blog => blog.status == 'draft'))

            setLoading(false)
        } catch (error) {
            console.error('Error fetching blogs:', error)
        }
    }

    // Fetch blogs when the component mounts.
    useEffect(() => {
        fetchBlogs()
    }, [])

    // Allows editing a blog by setting the current blog ID in context.
    const handleEditBlog = (blogId) => {
        // Handle the edit action here
        console.log('Edit blog with ID:', blogId)
        setCurrBlogId(blogId)
    }

    return (
        <div className='blog-viewer custom-scrollbar'>
            <button className='refresh-button' onClick={fetchBlogs}>
                {/* Refresh icon, spins while loading */}
                <MdOutlineRefresh className={`refresh-icon ${loading && 'loading'}`} />
            </button>

            {/* Published Blogs */}
            <h2>Published Blogs</h2>
            <ul className='blog-list'>
                {blogs.length === 0 && <span>No blogs available</span>}

                {/* Displaying list of published blogs */}
                {blogs.map((blog, index) => (
                    <li key={index}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <h3>{blog.title}</h3>

                                {/* Truncating content more than 70 characters of content */}
                                <p className='blog-content'>{blog.content.substring(0, 70) +
                                    (blog.content.length > 70 ? '...' : '')}</p>
                            </div>

                            {/* Edit button to edit the blog */}
                            <button className='edit-button' onClick={() => handleEditBlog(blog._id)}>
                                <FaEdit className='edit-icon' />
                            </button>
                        </div>

                        <div className='tags'>
                            {/* Displaying tags of the blog */}
                            {blog.tags.map((tag, index) => (
                                <span key={index} className='tag'>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Displaying updated date of the blog */}
                        <p className='blog-date'>Date: {new Date(blog.updated_at).toDateString()}</p>
                    </li>
                ))}
            </ul>

            {/* Draft Blogs */}
            <h2>Draft Blogs</h2>
            <ul className='blog-list'>
                {drafts.length === 0 && <span>No drafts available</span>}

                {/* Displaying list of draft blogs */}
                {drafts.map((blog, index) => (
                    <li key={index}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <h3>{blog.title}</h3>

                                {/* Truncating content more than 70 characters of content */}
                                <p className='blog-content'>{blog.content.substring(0, 70) +
                                    (blog.content.length > 70 ? '...' : '')}</p>
                            </div>

                            {/* Edit button to edit the blog */}
                            <button className='edit-button' onClick={() => handleEditBlog(blog._id)}>
                                <FaEdit className='edit-icon' />
                            </button>
                        </div>

                        <div className='tags'>
                            {/* Displaying tags of the blog */}
                            {blog.tags.map((tag, index) => (
                                <span key={index} className='tag'>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Displaying updated date of the blog */}
                        <p className='blog-date'>Date: {new Date(blog.updated_at).toDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Viewer;