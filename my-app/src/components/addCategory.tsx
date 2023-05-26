import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { Container, Form, Button } from "react-bootstrap";

interface CategoryCreateViewModel {
    name: string;
    description: string;
    image: File | null;
    priority: number;
}

const AddCategory: React.FC = () => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState<CategoryCreateViewModel>({
        name: "",
        description: "",
        image: null,
        priority: 0,
    });

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        event.preventDefault();
        console.log(formData);
        axios
            .post<CategoryCreateViewModel>("http://localhost:5287/api/categories/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }})
            .then((response) =>{  console.log(response);setValidated(false);})
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <Header></Header>
            <Container className="mt-5">
                <h1>Add Category</h1>
                <Form onSubmit={handleSubmit} noValidate validated={validated}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please enter a item name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a item description.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formItemImage">
                        <Form.Label  >Image</Form.Label>
                        <Form.Control
                            required
                            type="file" 
                            accept=".jpg,.png,.jpeg"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                if (event.target.files != null)
                                {
                                    const file = event.target.files[0];
                                    if (file) {
                                        setFormData({
                                            ...formData,
                                            image: file
                                        });
                                    }
                                }
                               
                            }}
                        />
                        <Form.Control.Feedback
                            type="invalid">
                            Please select a item image.
                        </Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group controlId="formPriority">
                        <Form.Label>Priority</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a priority.
                        </Form.Control.Feedback>
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
