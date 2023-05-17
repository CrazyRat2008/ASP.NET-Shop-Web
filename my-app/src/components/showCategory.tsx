import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { Card, Button } from "react-bootstrap";

interface Category {
    id: number;
    name: string;
    description: string;
    image: string;
    priority: number;
}

const CategoriesList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        axios
            .get<Category[]>("http://localhost:5287/api/categories/list")
            .then((response) => setCategories(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <Header></Header>
            <h1>Categories List</h1>
            <div className="row">
                {categories.map((category) => (
                    <div className="col-md-4 mb-4" key={category.id}>
                        <Card>
                            <Card.Img variant="top" src={category.image} alt={category.name} />
                            <Card.Body>
                                <Card.Title>{category.name}</Card.Title>
                                <Card.Text>{category.description}</Card.Text>
                                <Button variant="primary">Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesList;
