import React , { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Loader() {
    let [loading, setLoading] = useState(true);
    
    return (
        <div className="sweet-loading text-center">
            <ClipLoader
                color='#0000FF'
                loading={loading}
                css=''
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />

        </div>
    );
}

export default Loader;