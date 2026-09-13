import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

function App() {
  const [tarefa, setTarefa] = useState('')
 const [tarefas, setTarefas] = useState([
  { id: 1, texto: 'Estudar DevOps', concluida: false },
  { id: 2, texto: 'Aprender Git', concluida: false },
  { id: 3, texto: 'Criar projeto no GitHub', concluida: false }
])
  

  function adicionarTarefa(event) {
    event.preventDefault()
    if (!tarefa.trim()) return

    setTarefas([...tarefas, { id: Date.now(), texto: tarefa, concluida: false }])
    setTarefa('')
  }

  function alternarTarefa(id) {
    setTarefas(tarefas.map(item =>
      item.id === id ? { ...item, concluida: !item.concluida } : item
    ))
  }

  function removerTarefa(id) {
    setTarefas(tarefas.filter(item => item.id !== id))
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Minha Lista de Tarefas</h1>

        <form onSubmit={adicionarTarefa} className="formulario">
          <input
            type="text"
            value={tarefa}
            onChange={event => setTarefa(event.target.value)}
            placeholder="Digite uma tarefa..."
          />
          <button type="submit">Adicionar</button>
        </form>
        <p>
          Tarefas: {tarefas.length} | Concluídas: {tarefas.filter(item => item.concluida).length}
        </p>

        <ul className="lista">
          {tarefas.length === 0 && (
            <li className="vazio">Nenhuma tarefa cadastrada.</li>
          )}

          {tarefas.map(item => (
            <li key={item.id} className={item.concluida ? 'concluida' : ''}>
              <span onClick={() => alternarTarefa(item.id)}>{item.texto}</span>
              <button onClick={() => removerTarefa(item.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
