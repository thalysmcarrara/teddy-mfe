import { Minus } from "lucide-react";
import { useSelectedCustomers } from "../hooks/use-selected-customers";
import { removeCustomerFromSelected } from "../utils/removeUserFromSelected";
import { Card, IconButton, Button, Empty } from '@teddy/design-system'
import { clearAllSelectedUsers } from "../utils/clearAllSelectedCustomers";
import './styles.css'

export function Main() {
  const loggedUserName = localStorage.getItem('user')
  if(!loggedUserName) throw new Error('you should be logged')
  const INTL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  const selectedCustomers = useSelectedCustomers(loggedUserName);

  const handleRemoveUser = (userId: number) => {
    removeCustomerFromSelected(userId, loggedUserName);
  };

  const renderContent = () => (
    <>
      <div className="tse-top-menu">
        <h3 className="tse-selected-customers-title">Usuários Selecionados ({selectedCustomers.length}):</h3>
      </div>

      <div className="tse-card-list">
        {selectedCustomers.map(c => (
          <Card
            title={c.name}
            content={
              <div className="tse-card-content">
                <span>Salário: {INTL.format(c.salary)}</span>
                <span>Empresa: {INTL.format(c.companyValuation)}</span>
              </div>
            }
            footerSlotRight={<IconButton onClick={() => handleRemoveUser(c.id)} Icon={<Minus size={16} />} />}
          />
        ))}
      </div>
      <Button variant="outlined" className="tse-create-client-btn" onClick={() => clearAllSelectedUsers(loggedUserName)}>Limpar Selecionados</Button>
    </>
  )

  return (
    <main className="tse-main">
      { selectedCustomers.length > 0 ? renderContent() : <Empty 
        title="Nenhum usuário selecionado"
        subTitle="A lista está vazia. Adicione usuários para começar."/>
      }
    </main>
  );
}
