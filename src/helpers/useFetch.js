import {useState, useEffect} from "react";
import {useHistory} from "react-router";

import HttpStatusCode from "../constants/HttpStatusCode";
import {config} from "../config";

export function useFetch(url, options) {
    const history = useHistory();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const res = await fetch(`${config.baseURL}${url}`, options);
                const data = await res.json();
                setResponse(data);
            } catch (error) {
                if (error.status === HttpStatusCode.SOMETHING_WENT_WRONG) {
                    return history.push('/404');
                }
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);
    return { response, error, loading };
}
