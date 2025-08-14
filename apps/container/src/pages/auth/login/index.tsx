import { Button, TextField } from '@teddy/design-system'
import './styles.css'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useAuth } from '@src/auth/hooks/use-auth'

const LoginPage = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { login } = useAuth()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!name.trim()) {
      setError(true)
      setErrorMessage('O campo não pode ser vazio')
      return
    }

    setError(false)
    setErrorMessage('')
    login(name.trim())
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)

    if (error) {
      setError(false)
      setErrorMessage('')
    }
  }
  return (
    <form className='tco-login-form-container' onSubmit={handleSubmit}>
      <h2 className='tco-login-title'>Olá, seja bem-vindo!</h2>
      <TextField
        placeholder='Digite o seu nome:'
        onChange={handleInputChange} 
        error={error} 
        errorMessage={errorMessage}
      />
      <Button type='submit'>Entrar</Button>
    </form>
  )
}

export default LoginPage