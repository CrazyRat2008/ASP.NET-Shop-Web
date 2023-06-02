import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { ChangeEvent, useState } from "react"; 
import axios from "axios";
export interface IRegister {
    email: string,
    password: string,
    name:string,
    image:File|null,
    firstName:string,
    lastName:string,
    ConfirmPassword:string
}
const RegisterPage = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState<IRegister>({
        email: "",
        password: "",
        name: "",
        image: null,
        firstName: "",
        lastName: "",
        ConfirmPassword: ""
    }); 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        console.log(user);
        axios
            .post<IRegister>("http://localhost:5287/api/Auth/register", user, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                setUser({
                    email: "",
                    password: "",
                    name:"",
                    image: null,
                    firstName: "",
                    lastName: "",
                    ConfirmPassword: ""
                });
                navigate("/loginAdmin");
            })
            .catch((error) => console.log(error));
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <div style={{ minHeight: "100vh" }}>
                <div className="CenterContent" style={{margin:"0 auto",maxWidth:"50%"}}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ margin: "0 auto" }}>
                        <Form.Group className="mb-3" controlId="formCategoryName" >
                            <Form.Label style={{ 
                                fontSize: "30px"
                            }}>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter email"
                                name="email"
                                value={user.email}
                                required
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategoryName" >
                            <Form.Label style={{ 
                                fontSize: "30px"
                            }}>FirstName</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter firstName"
                                name="firstName"
                                value={user.firstName}
                                required
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a firstName.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategoryName" >
                            <Form.Label style={{ 
                                fontSize: "30px"
                            }}>LastName</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter lastName"
                                name="lastName"
                                value={user.lastName}
                                required
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a lastName.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategoryName" >
                            <Form.Label style={{ 
                                fontSize: "30px"
                            }}>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={user.name}
                                required
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formItemImage">
                            <Form.Label  >Image</Form.Label>
                            <Form.Control
                                required
                                type="file"
                                accept=".jpg,.png,.jpeg"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    if (event.target.files != null) {
                                        const file = event.target.files[0];
                                        if (file) {
                                            setUser({
                                                ...user,
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
                        <Form.Group className="mb-3" controlId="formCategoryDescription">
                            <Form.Label style={{ 
                                fontSize: "30px"
                            }}>Password</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter password"
                                name="password"
                                value={user.password}
                                required
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback
                                type="invalid">
                                Please enter a password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategoryDescription">
                            <Form.Label style={{ 
                                fontSize: "30px"
                            }}>ConfirmPassword</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter password again"
                                name="ConfirmPassword"
                                value={user.ConfirmPassword}
                                required
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback
                                type="invalid">
                                Please enter a  password again.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className="ButtonShop" style={{ margin: "0" }} type="submit">Login</Button>
                    </Form>
                </div>
            </div>
        </>
    );
};
export default RegisterPage;