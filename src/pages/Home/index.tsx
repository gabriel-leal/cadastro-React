  import './style.css'
  import lixo from '../../assets/lixo.svg'
  import { useState } from "react"
  import { toast, ToastContainer } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'

  function Home() {

    type User = {
      nome: string
      idade: number
      email: string
    }

    function capitalizeName(name: string) {
      return name
        .toLowerCase()
        .trim()
        .split(" ")
        .filter(Boolean)
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ")
    }

    function addUser() {
      if (!form.nome || !form.idade || !form.email) {
        toast.error("Por favor, preencha todos os campos.")
        return
      }
      setUsers([...users,  {nome: form.nome, idade: Number(form.idade), email: form.email}])
      setForm({ nome: "", idade: "", email: "" })
      toast.success("Usuário cadastrado com sucesso!")
    }

    function deleteUser(indexToDelete: number) {
      const filteredUsers = users.filter((_, index) => index !== indexToDelete)
      setUsers(filteredUsers)
      toast.info("Usuário deletado.")
    }

  const [users, setUsers] = useState<User[]>([
      { nome: "João", idade: 25, email: "joao@email.com" },
      { nome: "Maria", idade: 30, email: "maria@email.com" }
    ])

    const [form, setForm] = useState({
      nome: "",
      idade: "",
      email: ""
    })

    return (
      <>
        <ToastContainer position="top-right" />
        <div className='container'>
          <form autoComplete='off' onSubmit={e => {e.preventDefault() 
            addUser()}}>
            <h1>Cadastro De Usuários</h1>

            <input value={form.nome} onBlur={e => setForm({...form, nome: capitalizeName(e.target.value)})} onChange={e => setForm({ ...form, nome: e.target.value })} placeholder='Nome'/>

            <input value={form.idade} onChange={e => setForm({ ...form, idade: e.target.value })} type='number' placeholder='Idade'/>

            <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type='email' placeholder='Email'/>

            <button type='submit'>Cadastrar</button>
          </form>

          {users.map((user, index) => (
            <div key={index} className='card'>
              <div>
                <p><span>Nome:</span> {user.nome}</p>
                <p><span>Idade:</span> {user.idade}</p>
                <p><span>Email:</span> {user.email}</p>
              </div>
              <button type='button'><img src={lixo} alt="Lixeira" onClick={() => deleteUser(index)}/></button>
            </div>
          ))}
        </div>
      </>
    )

  }

  export default Home
