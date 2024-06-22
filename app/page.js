"use client"
import { useState, useEffect } from "react";
import InputField from "./components/atoms/inputs";
import LabelField from "./components/atoms/labels";
import ButtonForm from "./components/atoms/buttons";
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff, AtSign } from 'lucide-react';
import RedirectsOtherPages from "./components/atoms/redirects";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const newErrors = { email: "", password: "" };
  
    if (!email.trim()) {
      newErrors.email = "Digite o e-mail.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "E-mail inválido.";
    }
  
    if (!password.trim()) {
      newErrors.password = "A senha é obrigatória!";
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres!";
    }
  
    setErrors(newErrors);
  
    // Verificar se não há erros de validação
    if (!Object.values(newErrors).some((error) => error)) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        // Verificar se a resposta está OK
        if (response.ok) {
          toast.success("Login realizado com sucesso!");
          setEmail("");
          setPassword("");
          window.location.href = "file:///C:/Users/thiag/Desktop/Nova%20pasta%20(5)/Prototipagem/HTML/gerenciar.Musicas.html";
        } else {
          // Se houver um erro de login, mostrar mensagem de erro
          const data = await response.json();
          throw new Error(data.message || 'Erro ao fazer login.');
        }
      } catch (error) {
        // Exibir mensagem de erro se houver um erro de conexão
        toast.error(error.message || 'Erro ao fazer login.');
      }
    } else {
      // Se houver erros de validação, exibir mensagem de erro
      toast.error("Corrija os erros no formulário.");
    }
  };
  

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-white text-2xl font-bold sm:text-3xl md:text-4xl">Ritmo católico</h1>
          <p className="mt-4 text-zinc-400">
           Sua fonte de música inspiradora da Universidade Católica de Brasília. Acesse agora e mergulhe na harmonia da fé!
          </p>
        </div>

        <form method="POST" action="/api/login" onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4 rounded-lg p-4 md:shadow-lg lg:p-8 login-form-card-bg">
          <p className="text-center text-lg font-medium text-zinc-400">Faça o seu login</p>
          <div>
            <LabelField
              htmlFor="emailInput"
              id="emailLabel"
              text="E-mail"
            />
            <div className="relative">
              <InputField
                type="email"
                id="emailInput"
                placeholder="Digite aqui o seu e-mail."
                value={email}
                onChange={handleEmailChange}
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <AtSign size={16} color="rgb(156 163 175)" />
              </span>
            </div>
            {errors.email && <p className="text-red-500 text-xs flex items-center mt-2">{errors.email}</p>}
          </div>

          <div>
            <LabelField
              htmlFor="passwordInput"
              id="passwordLabel"
              text="Senha"
            />
            <div className="relative">
              <InputField
                type={showPassword ? "text" : "password"}
                id="passwordInput"
                placeholder="Digite a senha."
                value={password}
                onChange={handlePasswordChange}
              />
              <span
                className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <Eye size={16} color="rgb(156 163 175)" />
                ) : (
                  <EyeOff size={16} color="rgb(156 163 175)" />
                )}
              </span>

            </div>
            {errors.password &&
              <p className="text-red-500 text-xs flex items-center mt-2">{errors.password}</p>
            }
          </div>

          <div className="flex items-center justify-between">
            <ButtonForm
              type="submit"
              text="Login"
            />
            <Toaster />
          </div>
        <div className="flex text-center justify-center">
          <RedirectsOtherPages
            link="/register"
            mainText="Não tem uma conta?" 
            secondaryText="Registre-se"
          />
        </div>
        </form>
      </div>

      <div className="relative h-64 md:w-full sm:h-96 lg:h-full lg:w-1/2 hidden md:block">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1508749797192-efdd22441d42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
