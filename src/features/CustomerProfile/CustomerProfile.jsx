import { useParams, useNavigate } from 'react-router-dom';
import { PaymentsContainer } from '../../ui/PaymentsContainer/PaymentsContainer';
import { getAllTicketsById } from '../../actions/tickets.action';
import { useEffect, useState } from 'react';
import { getSpecificCustomer, deleteCustomerById } from '../../actions/customer.action';
import { StatsCard } from '../../ui/StatsCard/StatsCard';
import { TicketsContainer } from '../../ui/TicketsContainer/TicketsContainer';
import styles from './CustomerProfile.module.css';
import TrashIcon from "../../assets/trashIcon.svg?react";
import EditIcon from "../../assets/editIcon.svg?react";
import PhoneIcon from "../../assets/phoneCustomer.svg?react";
import EmailIcon from "../../assets/emailIcon.svg?react";
import MoneyBagIcon from "../../assets/moneyBagIcon.svg?react";
import StatsIcon from "../../assets/statsAnalityc.svg?react";
import TicketIcon from "../../assets/ticketIcon.svg?react";
import { CustomerModal } from '../CustomerModal/CustomerModal';
import { ViewHeader } from '../../ui/ViewHeader/ViewHeader';
import { useToast } from '../../context/ToastContext';
import { CUSTOMER_TYPE_LABELS } from '../../utils/customer.enums';


const CustomerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileCustomer, setProfileCustomer] = useState(null);
  const [activeCategory, setActiveCategory] = useState('resume');
  const [tickets, setAllTickets] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  const fetchData = async () => {
    try {
      const data = await getSpecificCustomer({ id })
      setProfileCustomer(data?.data);
    } catch (error) {
      console.error("Error al traer la info del cliente:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id])

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getAllTicketsById({ id })
        setAllTickets(data?.data || data);
      } catch (error) {
        console.error("error al traer los tickets del usuario: ", error);
      }
    }
    fetchTickets();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.");
    if (confirmDelete) {
      try {
        await deleteCustomerById({ customerId: id });
        showToast("Cliente eliminado", "El cliente fue eliminado exitosamente.", "success");
        navigate('/admin/customers');
      } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        showToast("Error", "Hubo un error al intentar eliminar el cliente.", "error");
      }
    }
  }

  if (!profileCustomer) {
    return <div>cargando perfil...</div>
  }


  return (
    <div className={styles.container}>
      <ViewHeader
        breadcrumb="admin > customers > profile"
        title="Perfil del Cliente"
        description={`Gestionando el perfil de ${profileCustomer?.customerName || 'Cliente'}`}
      />
      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.infoActions}>
            <h2>Información General</h2>
            <div className={styles.actions}>
              <div 
                className={styles.edit}
                onClick={() => setIsModalOpen(true)}
              >
                Editar<EditIcon /></div>
              <div 
                className={styles.delete}
                onClick={handleDelete}
              >
                Eliminar<TrashIcon />
              </div>
            </div>
          </div>

          <div className={styles.separatorLine} />
          <div className={styles.bodyCard}>
            <div className={styles.presentation}>
              <div>
                <strong>{profileCustomer.customerName}</strong>
              </div>
              <div className={`${styles.customerTypeContainer} ${styles[profileCustomer.customerType.toLowerCase()]}`}>
                {CUSTOMER_TYPE_LABELS[profileCustomer.customerType.toLowerCase()] || profileCustomer.customerType}
              </div>
            </div>
            <div className={styles.extraData}>
              <div className={styles.containerIndividualData}>
                <div className={styles.containerIconData}>
                  <PhoneIcon />
                </div>
                <strong>{profileCustomer.customerPhone}</strong></div>
              <div className={styles.containerIndividualData}>
                <div className={styles.containerIconData}>
                  <EmailIcon />
                </div>
                <strong>{profileCustomer.customerEmail}</strong></div>
              <div>Creado: <strong>{profileCustomer.customerCreatedAt ? profileCustomer.customerCreatedAt : "####"}</strong></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.containerKPI}>
        <StatsCard 
          nameCard={"Active tickets"}
          numberCard={tickets?.length || 0}
          iconCard={TicketIcon}
        />
        <StatsCard />
        <StatsCard />
      </div>
      <section>
        <div>
          <div className={styles.categories}>
            <div
              className={`${styles.categorie} ${activeCategory === 'resume' ? styles.active : ''}`}
              onClick={() => setActiveCategory('resume')}
            >
              <StatsIcon />
              <h3>Resume</h3>
            </div>
            <div
              className={`${styles.categorie} ${activeCategory === 'payments' ? styles.active : ''}`}
              onClick={() => setActiveCategory('payments')}
            >
              <MoneyBagIcon />
              <h3>Todos los pagos</h3>
            </div>
            <div
              className={`${styles.categorie} ${activeCategory === 'tickets' ? styles.active : ''}`}
              onClick={() => setActiveCategory('tickets')}
            >
              <TicketIcon />
              <h3>Todos los tickets</h3>
            </div>
          </div>
        </div>
        <div className={styles.containerContent}>
          <PaymentsContainer />
          <TicketsContainer
            data={tickets}
          />
        </div>
      </section>
      {isModalOpen && (
        <CustomerModal 
          onClose={() => {
            setIsModalOpen(false);
            fetchData();
          }}
          initialData={profileCustomer}
        />
      )}
    </div>
  );
};

export default CustomerProfile;
