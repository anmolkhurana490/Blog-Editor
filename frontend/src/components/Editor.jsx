import { use, useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../AppProvider';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from 'axios'

// Blog editor component with auto-save draft and publish functionality.
// Uses 'react-hook-form' for form management and axios for API calls.
const Editor = () => {
  // Context to manage the current blog ID
  const { currBlogId, setCurrBlogId } = useContext(AppContext);
  const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();

  // Ref to keep track of the current blog ID
  const currIdRef = useRef(currBlogId);

  // Ref to manage the timeout for auto-saving drafts, after 5 seconds of inactivity
  const timeOutRef = useRef(null);

  // get the current blog data from the form in an object
  const getBlogData = () => {
    const title = watch("title") || "";
    const content = watch("content") || "";
    const tags = (watch("tags") || "").split(",").map(tag => tag.trim()).filter(tag => tag !== "");
    return { id: currIdRef.current, title, content, tags };
  }

  // Function to publish the blog
  const publish = async () => {
    const blogData = getBlogData();

    const response = await axios.post('http://localhost:5000/api/blogs/publish', blogData, { withCredentials: true });
    if (response.status === 201) {
      if (response.data.id) currIdRef.current = response.data.id;
      alert("Blog published successfully");

      // Reset the form fields and current blog ID after publishing
      reset({
        title: "",
        content: "",
        tags: ""
      });

      setCurrBlogId(undefined)
      currIdRef.current = undefined;
    } else {
      alert("Error publishing blog");
    }
  };

  // Function to save the blog as a draft
  const saveDraft = async () => {
    const blogData = getBlogData();
    console.log("Saving draft...", watch(), blogData);

    const response = await axios.post('http://localhost:5000/api/blogs/save-draft', blogData, { withCredentials: true });

    if (response.status === 201) {
      // draft saved successfully
      // if new blog is created, set the current blog ID
      if (response.data.id) currIdRef.current = response.data.id;
      console.log("Draft saved successfully");
    } else {
      console.log("Error saving draft");
    }
  };

  // fetch the blog data when some blog of blogId is to be edited
  useEffect(() => {
    const fetchBlogData = async (blogId) => {
      const response = await axios.get(`http://localhost:5000/api/blogs/${blogId}`, { withCredentials: true });

      if (response.status === 200) {
        const { title, content, tags } = response.data;

        // Set the form fields with the fetched blog data and current blog ID
        reset({
          title, content, tags: tags.join(", ")
        });

        currIdRef.current = blogId;
      }
    };

    // If a blog ID is already present, blog is being edited
    if (currBlogId) {
      fetchBlogData(currBlogId);
    }
  }, [currBlogId]);


  // Auto-save toast message
  const autoSaveToast = () => {
    toast.success('Auto-saved Draft', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    })
  }

  // Auto-save draft every 30 seconds if title and content are not empty
  useEffect(() => {
    const interval = setInterval(() => {
      if (watch("title") !== "" && watch("content") !== "") {
        console.log("Auto-saving draft...", currIdRef.current);
        saveDraft();
        autoSaveToast();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-save draft every 5 seconds if title and content are not empty
  // when the user is typing, clear the timeout and set a new one
  // Debouncing technique to avoid multiple API calls
  useEffect(() => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);

    timeOutRef.current = setTimeout(() => {
      if (watch("title") !== "" && watch("content") !== "") {
        console.log("Auto-saving draft...", currIdRef.current);
        saveDraft();
        autoSaveToast();
      }
    }, 5000); // Auto-save after 5 seconds of inactivity
  }, [watch("title"), watch("content"), watch("tags")]);

  return (
    <>
      <div className="blog-editor custom-scrollbar">
        <h1>Blog Editor</h1>

        <form>
          {/* Title Input */}
          <div>
            <label>
              Title:
              <input
                type="text"
                placeholder="Enter blog title"
                className="title-input"
                {...register("title", { required: true })}
              />

              {errors.title && <span className="error">Title is required</span>}
            </label>
          </div>

          {/* Content Input */}
          <div>
            <label>
              Content:
              <textarea
                placeholder="Write your blog content here..."
                rows={10}
                className="content-textarea"
                {...register("content", { required: true })}
              />

              {errors.content && <span className="error">Content is required</span>}
            </label>
          </div>

          {/* Tags Input */}
          <div>
            <label>
              Tags (comma-separated):
              <input
                type="text"
                placeholder="e.g. react, javascript, webdev"
                className="tags-input"
                {...register("tags")}
              />
            </label>
          </div>

          {/* Buttons for saving draft and publishing */}
          <div style={{ marginTop: "16px" }}>
            <button
              type="button"
              className="draft-button"
              onClick={handleSubmit(saveDraft)}
            >
              Save as Draft
            </button>

            <button
              className="publish-button"
              onClick={handleSubmit(publish)}
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Editor