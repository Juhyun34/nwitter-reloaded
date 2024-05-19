import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Input, Switcher, Title, Wrapper, Error, Form } from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        if(name === "name") {
            setName(value);
        } else if(name === "email") {
            setEmail(value)
        } else if(name === "password") {
            setPassword(value)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if(isLoading || name === "" || email === "" || password === "") return;
        try {
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName: name,
            });
            navigate("/")
        } catch (e) {
            if(e instanceof FirebaseError) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
        console.log(name, email, password);
    }

    return <Wrapper>
        <Title>Join ❌</Title>
        <Form onSubmit={onSubmit}>
            <Input name="name" value={name} placeholder="Name" type="text" required onChange={onChange} />
            <Input name="email" value={email} placeholder="Email" type="email" required onChange={onChange} />
            <Input name="password" value={password} placeholder="Password" type="password" onChange={onChange} />
            <Input placeholder="Create Account" value={isLoading ? "Loading..." : "Create Account"} type="submit"/>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
            Already have an account? <Link to="/login">Log in &rarr;</Link>
        </Switcher>
        <GithubButton />
    </Wrapper> 
}