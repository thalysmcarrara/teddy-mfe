import { useState } from 'react';
import './styles.css'
import { useUsersList } from '@src/http/query/use-users-list';
import { Button, Card, IconButton, NumberSelect, Pagination } from '@teddy/design-system';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { CreateUserModal } from './components/create-user-modal';
import { EditUserModal } from './components/edit-user-modal';
import type { User } from '@src/types';
import { DeleteUserModal } from './components/delete-user-modal';
import { addUserToSelected } from '../utils/addUserToSelected';

const itemPerPageOptions = [5, 10, 20, 50]

export function Main() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const loggedUsername = localStorage.getItem('user') || ''

  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const INTL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

  const { data, isLoading, isError } = useUsersList(currentPage, limit);

  const handleItemsPerPage = (value: number) => {
    if (!data) return;

    const estimatedTotalItems = totalPages * limit;

    const newTotalPages = Math.ceil(estimatedTotalItems / value);

    setCurrentPage(prevPage => Math.min(prevPage, newTotalPages));
    setLimit(value);
  }

  if (isLoading) return <div>Carregando…</div>;
  if (isError || !data) return <div>Erro ao carregar</div>;

  const { clients, totalPages } = data

  const renderContent = () => (
    <>
      <div  className="tcu-top-menu">
        <p>{clients.length} clientes encontrados:</p>
        <div className="tcu-per-page-container">
          <p>Clientes por página:</p>
          <NumberSelect items={itemPerPageOptions} value={limit} onChange={handleItemsPerPage} />
        </div>
      </div>
      <div className="tcu-card-list">
        {
          clients && clients.map((c) => <Card
            key={c.id}
            title={c.name}
            content={<div className="tcu-card-content">
              <span>Salário: {INTL.format(c.salary)}</span>
              <span>Empresa: {INTL.format(c.companyValuation)}</span>
            </div>}
            footerSlotLeft={<IconButton onClick={() => addUserToSelected(c, loggedUsername)} Icon={<Plus size={16} />} />}
            footerSlotCenter={<IconButton onClick={() => setUserToUpdate(c)} Icon={<Pencil size={16} />} />}
            footerSlotRight={<IconButton onClick={() => setUserToDelete(c)} Icon={<Trash2 size={16} />} />}
            />)
        }
      </div>
      <Button variant="outlined" className="tcu-create-client-btn" onClick={() => setOpenCreateUserModal(true)}>Criar Client</Button>
      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={totalPages} siblingCount={1}/>
    </>
  )

  return (
    <main className="tcu-main">
      { clients && renderContent()}
      <CreateUserModal open={openCreateUserModal} onClose={() => setOpenCreateUserModal(false)} />
      { userToUpdate && <EditUserModal user={userToUpdate} onClose={() => setUserToUpdate(null)} /> }
      { userToDelete && <DeleteUserModal user={userToDelete} onClose={() => setUserToDelete(null) } /> }
    </main>
  )
}