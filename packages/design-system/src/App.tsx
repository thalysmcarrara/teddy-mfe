import { useState } from "react"
import { Button } from "./components/Button"
import Modal from "./components/Modal"
import { TextField } from "./components/Textfield"
import { Pagination } from "./components/Pagination"

const App = () => {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState<number>(4);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10}}>
      <h1 style={{ margin: '20px auto 40px auto' }}>Preview</h1>
      <Modal
        title='Editar Cliente:'
        open={open}
        onClose={() => setOpen(false)}
        footer={<Button onClick={() => setOpen(false)} >Feito</Button>}
        >
          <span>Oi eu sou o Modal!</span>
      </Modal>
      <Button variant='outlined' onClick={() => setOpen(true)} >Click</Button>
      <Button variant='contained' onClick={() => setOpen(true)} >Click</Button>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 400, margin: "0 auto"}}>
        <TextField placeholder="Digite o nome" error errorMessage="campo vazio" value=""/>
        <TextField placeholder="Digite o nome" disabled/>
        <TextField placeholder="Digite o nome"/>
        <Pagination totalPages={12} currentPage={page} onPageChange={setPage} siblingCount={1} />
      </div>
    </div>
  )
}

export default App