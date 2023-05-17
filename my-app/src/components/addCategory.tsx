import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { Container, Form, Button } from "react-bootstrap";

interface CategoryCreateViewModel {
    name: string;
    description: string;
    image: string;
    priority: number;
}

const AddCategory: React.FC = () => {
    const [formData, setFormData] = useState<CategoryCreateViewModel>({
        name: "",
        description: "",
        image: "",
        priority: 0,
    });

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios
            .post("http://localhost:5287/api/categories/create", formData)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <Header></Header>
            <Container className="mt-5">
                <h1>Add Category</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPriority">
                        <Form.Label>Priority</Form.Label>
                        <Form.Control
                            type="number"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Category
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default AddCategory;
