import { useDeleteUser } from "@src/http/mutation";
import type { User } from "@src/types";
import { Button, Modal } from "@teddy/design-system"

export type DeleteUserModalProps = {
  user: User;
  onClose: () => void;
}

export const DeleteUserModal = ({ user, onClose }: DeleteUserModalProps) => {
  const deleteUser = useDeleteUser();

  const handleSubmit = () => {
    deleteUser.mutate(
      {
        id: user.id
      },
    )
    onClose()
  }

  return (
    <Modal
      open={true} onClose={onClose}
      title="Criar cliente:"
      footer={<Button onClick={handleSubmit}>Deletar Cliente</Button>
      }
    >
      <p>Você está prestes a excluir o cliente: <span style={{ fontWeight: 700 }}>{user.name}</span></p>
    </Modal>
  )
}