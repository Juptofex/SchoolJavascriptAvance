import { useEffect, useState } from "react";

const Joke = () => {
    const [joke, setJoke] = useState<string | null>(null);
    const [joke_category, setJoke_category] = useState<string | null>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchJoke = () => {
            fetch('https://v2.jokeapi.dev/joke/Any?type=single')
                .then((response) => {
                    if (!response.ok)
                        throw new Error(
                            `fetch error : ${response.status} : ${response.statusText}`
                        );
                    return response.json();
                })
                .then((data) => {
                    setJoke(data.joke);
                    setJoke_category(data.category);
                })
                .catch((err) => {
                    console.error("HomePage::error: ", err);
                });
        };

        fetchJoke(); // Fetch a joke immediately on mount

        const interval = setInterval(() => {
            setCount(prevCount => prevCount + 1);
            fetchJoke(); // Fetch a new joke every 10 seconds
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <p>Joke: {joke}</p>
            <p>Category: {joke_category}</p>
            <p>Count: {count}</p>
        </div>
    );
};

export default Joke;