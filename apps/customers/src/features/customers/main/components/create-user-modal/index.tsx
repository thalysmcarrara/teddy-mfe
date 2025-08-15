import { useCreateUser } from "@src/http/mutation";
import { Button, Modal, TextField } from "@teddy/design-system"
import { Loader } from "lucide-react";
import { useState, type ChangeEvent } from "react";

export type CreateUserModalProps = {
  open: boolean;
  onClose: () => void;
}

export const CreateUserModal = ({ open, onClose }: CreateUserModalProps) => {
  const [name, setName] = useState('')
  const [salary, setSalary] = useState('')
  const [companyValuation, setCompanyValuation] = useState('')
  const createUser = useCreateUser();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSalaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSalary(e.target.value)
  }

  const handleCompanyValuationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCompanyValuation(e.target.value)
  }

  const handleSubmit = () => {
    createUser.mutate(
      {
        name,
        salary: Number(salary),
        companyValuation: Number(companyValuation)
      },
      {
        onSettled: () => {
          setCompanyValuation('')
          setName('')
          setSalary('')
          onClose()
        }
      }
    )
  }

  const disableOnEmpty = !name || !salary || !companyValuation 

  return (
    <Modal
      open={open} onClose={onClose}
      title="Criar cliente:"
      footer={
        <Button 
          disabled={createUser.isPending || disableOnEmpty}
          onClick={handleSubmit}
        >{
          createUser.isPending? (<Loader size={20} />) : 'Criar Cliente'
          }
        </Button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <TextField placeholder="Digite o nome:" value={name} onChange={handleNameChange}/>
        <TextField placeholder="Digite o salário:" value={salary} onChange={handleSalaryChange} />
        <TextField 
          placeholder="Digite o valor da empresa:" 
          value={companyValuation} 
          onChange={handleCompanyValuationChange}
          />
      </div>
    </Modal>
  )
}