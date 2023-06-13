import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import propTypes from "prop-types";
import {addToast} from "../store/toastSlice";
import LoadingSpinner from "./LoadingSpinner";

const BlogForm = ({editing}) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [originalTitle, setOriginalTitle] = useState('');
    const [body, setBody] = useState('');
    const [originalBody, setOriginalBody] = useState('');
    const [publish, setPublish] = useState(false);
    const [originalPublish, setOriginalPublish] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [bodyError, setBodyError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        if(editing) {
            axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
                setTitle(res.data.title);
                setOriginalTitle(res.data.title);
                setBody(res.data.body);
                setOriginalBody(res.data.body);
                setPublish(res.data.publish);
                setOriginalPublish(res.data.publish);
                setLoading(false);
            }).catch(e => {
                setError('Somthing went wrong in db');
                addToast({
                    text: 'Somthing went wrong in db',
                    type: 'danger'
                });
                setLoading(false);
            });
        }else{
            setLoading(false);
        }
    }, [id, editing]);

    const goBack = () => {
        if(editing){
            navigate(`/blogs/${id}`);
        }else{
            navigate('/blogs');
        }
    };

    const isEdited = () => {
        return title !== originalTitle
            || body !== originalBody
            || publish !== originalPublish;
    };

    const validateForm = () => {
        let validate = true;

        if(title === ''){
            setTitleError(true);
            validate = false;
        }

        if(body === ''){
            setBodyError(true);
            validate = false;
        }

        return validate;
    };

    const onSubmit = () => {
        setTitleError(false);
        setBodyError(false);

        if(validateForm()){
            if(editing){
                axios.patch(`http://localhost:3001/posts/${id}`, {
                    title,
                    body,
                    publish,
                }).then(() => {
                    navigate(`/blogs/${id}`);
                }).catch(e => {
                    addToast({
                        text: 'We could not update blog',
                        type: 'danger'
                    });
                });
            }else{
                axios.post('http://localhost:3001/posts', {
                    title,
                    body,
                    publish,
                    createdAt: Date.now()
                }).then(() => {
                    addToast({
                        type: 'success',
                        text: 'Successfully created!'
                    });
                    navigate('/admin');
                }).catch(e => {
                    addToast({
                        text: 'We could not create blog',
                        type: 'danger'
                    });
                });
            }
        }
    };

    const onChangePublish = (e) => {
        console.log(e.target.checked);
        setPublish(e.target.checked);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (<div>{error}</div>)
    }

    return(
        <div>
            <h1>{editing ? 'Edit' : 'Create'} a blog post</h1>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    className={`form-control ${titleError ? 'border-danger': ''}`}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />
                {titleError && <div className="text-danger">
                    Title is required.
                </div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Body</label>
                <textarea
                    className={`form-control ${bodyError ? 'border-danger': ''}`}
                    value={body}
                    onChange={(event) => {
                        setBody(event.target.value);
                    }}
                    rows="10"
                />
                {bodyError && <div className="text-danger">
                    Body is required.
                </div>}
            </div>
            <div className="form-check mb-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={publish}
                    onChange={onChangePublish}
                />
                <label className="form-check-label">
                    Publish
                </label>
            </div>
            <button
                className="btn btn-primary"
                onClick={onSubmit}
                disabled={editing && !isEdited()}
            >
                {editing ? 'Edit' : 'Post'}
            </button>
            <button
                className="btn btn-danger ms-2"
                onClick={goBack}
            >
                Cancel
            </button>
        </div>
    );
};

BlogForm.propTypes = {
    editing: propTypes.bool
}

BlogForm.defaultProps = {
    editing: false
}

export default BlogForm;