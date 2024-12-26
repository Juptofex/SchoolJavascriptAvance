import { useEffect, useRef, useState } from "react";

interface RandomDogProps {
    refresh: number;
}

const RandomDog = ({ refresh }: RandomDogProps) => {
    const [dog, setDog] = useState<string | null>(null);

    const fetchDog = async () => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random')

            if (!response.ok)
                throw new Error(
                    `fetch error : ${response.status} : ${response.statusText}`
                );
            
            const dog = await response.json();
            setDog(dog.message);
        } catch(err) {
                console.error("HomePage::error: ", err);
        }
    };

    useEffect(() => {
        fetchDog();

        const interval = setInterval(() => {
            fetchDog();; // Fetch a new joke every 10 seconds
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    return dog ? <img src={dog} alt="Random Dog" /> : <p>Loading...</p>;
};

export default RandomDog;