import propTypes from "prop-types";

const Toast = ({ toasts, type }) => {
    return (
        <div className="position-fixed bottom-0 end-0 p-2">
            {toasts.map(toasts => {
                return (
                    <div className={`alert alert-${toasts.type || 'success'} m-0 py-2 mt-2`}>
                        {toasts.text}
                    </div>
                );
            })}
        </div>
    )
};

Toast.propTypes = {
    toasts: propTypes.arrayOf(propTypes.shape({
        text: propTypes.string,
        type: propTypes.string
    })).isRequired,
}

Toast.defaultProps = {
    toasts: []
}

export default Toast;