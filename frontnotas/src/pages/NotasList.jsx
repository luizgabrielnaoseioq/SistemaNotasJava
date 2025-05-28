import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

function NotasList() {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotas = async () => {
    try {
      const res = await api.get('/');
      setNotas(res.data);
    } catch {
      toast.error('Erro ao carregar notas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotas();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente excluir esta nota?')) return;
    try {
      await api.delete(`/${id}`);
      setNotas(notas.filter(n => n.id !== id));
      toast.success('Nota excluída!');
    } catch {
      toast.error('Erro ao excluir nota');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notas</h1>
        <Link to="/nova" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Nova Nota</Link>
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="space-y-4">
          {notas.length === 0 && <p>Nenhuma nota encontrada.</p>}
          {notas.map(nota => (
            <div key={nota.id} className="bg-white shadow rounded p-4 flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-lg">{nota.titulo}</h2>
                <p className="text-gray-700">{nota.descricao}</p>
                {nota.dataCriacao && (
                  <p className="text-xs text-gray-500 mt-1">
                    Criada em: {new Date(nota.dataCriacao).toLocaleString('pt-BR')}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Link to={`/editar/${nota.id}`} className="text-blue-600 hover:underline">Editar</Link>
                <button
                  onClick={() => handleDelete(nota.id)}
                  className="text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotasList;
