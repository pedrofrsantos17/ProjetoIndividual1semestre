import React, { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro');
      setMessage({ type: 'success', text: 'Cadastro realizado com sucesso' });
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <label>
        Nome
        <input name="name" value={form.name} onChange={handleChange} />
      </label>
      <label>
        Email
        <input name="email" value={form.email} onChange={handleChange} />
      </label>
      <label>
        Senha
        <input name="password" type="password" value={form.password} onChange={handleChange} />
      </label>
      <button type="submit">Cadastrar</button>
      {message && <div className={"msg " + message.type}>{message.text}</div>}
    </form>
  );
}
