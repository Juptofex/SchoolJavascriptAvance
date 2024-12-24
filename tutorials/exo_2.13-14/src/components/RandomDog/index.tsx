import { useEffect, useRef, useState } from "react";

interface RandomDogProps {
    refresh: number;
}

const RandomDog = ({ refresh }: RandomDogProps) => {
    const [dog, setDog] = useState<string | null>(null);

    const fetchDog = () => {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then((response) => {
                if (!response.ok)
                    throw new Error(
                        `fetch error : ${response.status} : ${response.statusText}`
                    );
                return response.json();
            })
            .then((data) => {
                setDog(data.message);
            })
            .catch((err) => {
                console.error("HomePage::error: ", err);
            });
    };

    useEffect(() => {
        fetchDog();
    }, [refresh]);

    return dog ? <img src={dog} alt="Random Dog" /> : <p>Loading...</p>;
};

export default RandomDog;