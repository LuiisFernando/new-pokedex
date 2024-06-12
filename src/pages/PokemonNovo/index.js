import { useParams } from "react-router"

export default function Pokemon() {
    const { id } = useParams();

    console.log(id);

    return <h1>Pokemon</h1>
}