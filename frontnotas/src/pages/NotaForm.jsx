import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

function NotaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/${id}`)
        .then(res => {
          setTitulo(res.data.titulo);
          setDescricao(res.data.descricao);
        })
        .catch(() => toast.error('Erro ao carregar nota'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const validate = () => {
    const errs = {};
    if (!titulo.trim()) errs.titulo = "Título é obrigatório";
    if (!descricao.trim()) errs.descricao = "Descrição é obrigatória";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      if (id) {
        await api.put(`/${id}`, { titulo, descricao });
        toast.success('Nota atualizada!');
      } else {
        await api.post('', { titulo, descricao });
        toast.success('Nota criada!');
      }
      navigate('/');
    } catch {
      toast.error('Erro ao salvar nota');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Editar Nota' : 'Nova Nota'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Título</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            required
            disabled={loading}
          />
          {errors.titulo && <span className="text-red-500">{errors.titulo}</span>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Descrição</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            required
            disabled={loading}
          />
          {errors.descricao && <span className="text-red-500">{errors.descricao}</span>}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <Link to="/" className="px-4 py-2 rounded border">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}

export default NotaForm;
