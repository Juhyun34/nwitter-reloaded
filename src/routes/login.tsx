import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Input, Switcher, Title, Wrapper, Error, Form } from "../components/auth-components";
import GithubButton from "../components/github-btn";



export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        if(name === "email") {
            setEmail(value)
        } else if(name === "password") {
            setPassword(value)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if(isLoading || email === "" || password === "") return;
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);

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
        <Title>Log into ❌</Title>
        <Form onSubmit={onSubmit}>
            <Input name="email" value={email} placeholder="Email" type="email" required onChange={onChange} />
            <Input name="password" value={password} placeholder="Password" type="password" onChange={onChange} />
            <Input placeholder="Create Account" value={isLoading ? "Loading..." : "Create Account"} type="submit"/>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
            Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
        </Switcher>
        <GithubButton />
    </Wrapper> 
}