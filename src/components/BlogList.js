import LoadingSpinner from "./LoadingSpinner";
import Card from "../pages/Card";
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const BlogList = () => {
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPosts = () => {
        axios.get('http://localhost:3001/posts').then((res) => {
            setPosts(res.data);
            setLoading(false);
        });
    };

    const deleteBlog = (e, id) => {
        e.stopPropagation();
        axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
            setPosts((prevState) => prevState.filter((post) => post.id !== id));
        });
    };

    useEffect(() => {
        getPosts();
    }, []);

    if (loading) {
        return (<LoadingSpinner />);
    }

    if (posts.length === 0) {
        return (<div>No blog posts found</div>);
    }

    return posts.filter((post) => {
        return post.publish;
    }).map(post => {
        return (
            <Card
                key={post.id}
                title={post.title}
                onClick={() => history.push(`/blogs/${post.id}`)}
            >
                <div>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={(e) => deleteBlog(e, post.id)}
                    >
                        Delete
                    </button>
                </div>
            </Card>
        );
    });
};

export default BlogList;