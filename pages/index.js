import { useEffect, useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState("Carregando...");
  const [lucro, setLucro] = useState(0);
  const [ativo, setAtivo] = useState(true);

  const fetchStatus = async () => {
    try {
      const res = await fetch("https://zenainvest-api.render.com/status");
      const data = await res.json();
      setStatus(data.status);
      setLucro(data.lucro);
      setAtivo(data.ativo);
    } catch {
      setStatus("Erro");
    }
  };

  const toggleBot = async () => {
    try {
      const res = await fetch("https://zenainvest-api.render.com/toggle", { method: "POST" });
      const data = await res.json();
      setAtivo(data.ativo);
      setStatus(data.status);
    } catch {
      alert("Erro ao pausar ou ativar o robô");
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: 40 }}>
      <h1 style={{ fontSize: '2rem', color: '#2563eb' }}>ZenaInvest</h1>
      <p>Status do Robô: <strong>{status}</strong></p>
      <p>Lucro acumulado: <strong>${lucro.toFixed(2)}</strong></p>
      <button onClick={toggleBot} style={{
        marginTop: 20, padding: 10, background: ativo ? '#ef4444' : '#22c55e',
        color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold'
      }}>
        {ativo ? "Pausar Robô" : "Ativar Robô"}
      </button>
    </div>
  );
}
