import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import {useSelector} from "react-redux";
import {addToast} from "../store/toastSlice";

const ShowPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(0);
    const [error, setError] = useState('');
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const getPost = (id) => {
        axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            setPost(res.data);
            setLoading(false);
        }).catch(e => {
            setLoading(false);
            setError('Somthing went wrong in db');
            addToast({
                text: 'Somthing went wrong in db',
                type: 'danger'
            });
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('hello');
            setTimer(prev => prev + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        getPost(id);
    }, [id]);

    const printDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    }

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (<div>{error}</div>)
    }

    return (
        <div>
            <div className="d-flex">
                <h1 className="flex-grow-1">{post.title} ({timer}초)</h1>
                {isLoggedIn && <div>
                    <Link
                        className="btn btn-primary"
                        to={`/blogs/${id}/edit`}
                    >
                        Edit
                    </Link>
                </div>}
            </div>
            <small className="text-muted">
                Created At: {printDate(post.createdAt)}
            </small>
            <hr />
            <p>{post.body}</p>
        </div>
    );
};

export default ShowPage;