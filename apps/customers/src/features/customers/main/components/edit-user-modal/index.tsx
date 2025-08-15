import { useUpdateUser } from "@src/http/mutation";
import type { User } from "@src/types";
import { Button, Modal, TextField } from "@teddy/design-system"
import { useState, type ChangeEvent } from "react";

export type editUserModalProps = {
  user: User;
  onClose: () => void;
}

export const EditUserModal = ({ user, onClose }: editUserModalProps) => {
  const [name, setName] = useState(user.name)
  const [salary, setSalary] = useState(String(user.salary))
  const [companyValuation, setCompanyValuation] = useState(String(user.companyValuation))
  const updateUser = useUpdateUser();

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
    if (!user) return
    updateUser.mutate(
      {
        id: user.id,
        data: { 
          name,
          salary: Number(salary),
          companyValuation: Number(companyValuation)
        }
      },
      {
        onSettled: () => {
          setCompanyValuation('')
          setName('')
          setSalary('')
        }
      }
    )
    onClose()
  }

  const disableOnEmpty = !name || !salary || !companyValuation 

  return (
    <Modal
      open={true} onClose={onClose}
      title="Criar cliente:"
      footer={
        <Button 
          disabled={updateUser.isPending || disableOnEmpty}
          onClick={handleSubmit}
        >
          Criar Cliente
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