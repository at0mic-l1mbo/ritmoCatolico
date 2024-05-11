"use client"
import { useState, useEffect } from "react";
import LabelField from "../components/atoms/labels";
import InputField from "../components/atoms/inputs";
import toast, { Toaster } from 'react-hot-toast';
import ButtonForm from "../components/atoms/buttons";
import RedirectsOtherPages from "../components/atoms/redirects";
import RitmoCatolicoLogo from "../components/atoms/logo";

export default function Register() {
    const [isMounted, setIsMounted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        const newErrors = { ...errors };

        // Validating first name
        if (formData.firstName.trim() === "") {
            newErrors.firstName = "O primeiro nome é obrigatório";
            isValid = false;
        } else {
            newErrors.firstName = "";
        }

        // Validating last name
        if (formData.lastName.trim() === "") {
            newErrors.lastName = "O último nome é obrigatório";
            isValid = false;
        } else {
            newErrors.lastName = "";
        }

        // Validating email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Digite um e-mail válido";
            isValid = false;
        } else {
            newErrors.email = "";
        }

        // Validating password
        if (formData.password.trim() === "") {
            newErrors.password = "A senha é obrigatória";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "A senha deve ter pelo menos 6 caracteres!"
            isValid = false;
        } else {
            newErrors.password = "";
        }

        // Validating password confirmation
        if (formData.passwordConfirmation.trim() === "") {
            newErrors.passwordConfirmation = "Confirme a senha";
            isValid = false;
        } else if (formData.password !== formData.passwordConfirmation) {
            newErrors.passwordConfirmation = "As senhas não coincidem";
            isValid = false;
        } else {
            newErrors.passwordConfirmation = "";
        }

        if (isValid) {
            toast.success("Dados enviados com sucesso!")
            setErrors({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                passwordConfirmation: ""
            })
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                passwordConfirmation: ""
            })
        } else {
            setErrors(newErrors);
            toast.error("Corrija os erros no formulário.");
        }
    };

    return (

        <section style={{ backgroundColor: "#191816" }}>
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1531889212584-6d114ab8f37d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />

                    <div className="hidden lg:relative lg:block lg:p-12">
                        <a className="block text-white" href="#">
                            <span className="sr-only">Home</span>
                            <RitmoCatolicoLogo />
                        </a>

                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Ritmo Católico
                        </h2>

                        <p className="mt-4 leading-relaxed text-white/90">
                            Registre-se no Ritmo Católico, o app de música da Universidade Católica de Brasília. Acesse uma variedade de músicas inspiradoras, crie playlists personalizadas e mantenha-se atualizado com novos lançamentos e eventos exclusivos. Junte-se a nós nesta jornada de fé e harmonia!
                        </p>
                    </div>
                </section>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative -mt-16 block lg:hidden">
                            <a
                                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                                href="#"
                            >
                                <span className="sr-only">Home</span>
                                <RitmoCatolicoLogo />
                            </a>

                            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                Ritmo Católico
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500">
                                Registre-se no Ritmo Católico, o app de música da Universidade Católica de Brasília. Acesse uma variedade de músicas inspiradoras, crie playlists personalizadas e mantenha-se atualizado com novos lançamentos e eventos exclusivos. Junte-se a nós nesta jornada de fé e harmonia!
                            </p>
                        </div>

                        <form method="POST" action="/api/register" className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
                            <div className="col-span-6 sm:col-span-3">
                                <LabelField
                                    htmlFor="firstName"
                                    id="firstName"
                                    text="Primeiro nome"
                                />
                                <InputField
                                    type="text"
                                    id="firstName"
                                    placeholder="Digite aqui o seu primeiro nome."
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <p className="text-red-500 text-xs flex items-center mt-2">{errors.firstName}</p>}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <LabelField
                                    htmlFor="lastName"
                                    id="lastName"
                                    text="Último nome"
                                />
                                <InputField
                                    type="text"
                                    id="lastName"
                                    placeholder="Digite aqui o seu último nome."
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName && <p className="text-red-500 text-xs flex items-center mt-2">{errors.lastName}</p>}
                            </div>

                            <div className="col-span-6">
                                <LabelField
                                    htmlFor="email"
                                    id="email"
                                    text="E-mail"
                                />
                                <InputField
                                    type="text"
                                    id="email"
                                    placeholder="Digite aqui o seu email."
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-xs flex items-center mt-2">{errors.email}</p>}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <LabelField
                                    htmlFor="password"
                                    id="password"
                                    text="Senha"
                                />
                                <InputField
                                    type="password"
                                    id="password"
                                    placeholder="Digite aqui a sua senha."
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <p className="text-red-500 text-xs flex items-center mt-2">{errors.password}</p>}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <LabelField
                                    htmlFor="passwordConfirmation"
                                    id="passwordConfirmation"
                                    text="Confirme a sua senha"
                                />
                                <InputField
                                    type="password"
                                    id="passwordConfirmation"
                                    placeholder="Digite aqui a mesma senha."
                                    value={formData.passwordConfirmation}
                                    onChange={handleChange}
                                />
                                {errors.passwordConfirmation && <p className="text-red-500 text-xs flex items-center mt-2">{errors.passwordConfirmation}</p>}
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <ButtonForm
                                    type="submit"
                                    text="Registre-se"
                                />
                                <Toaster />
                            </div>
                            <div className="col-span-6 flex text-center justify-center">
                                <RedirectsOtherPages
                                    link="/"
                                    mainText="Já tem uma conta?"
                                    secondaryText="Login"
                                />
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    )
}