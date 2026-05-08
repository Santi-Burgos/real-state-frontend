import { useParams } from 'react-router-dom';
import styles from './CustomerProfile.module.css';
import { useEffect, useState } from 'react';
import { getSpecificCustomer } from '../../actions/customer.action';
import TrashIcon from "../../assets/trashIcon.svg?react";
import EditIcon from "../../assets/editIcon.svg?react";
import PhoneIcon from "../../assets/phoneCustomer.svg?react";
import EmailIcon from "../../assets/emailIcon.svg?react";

const CustomerProfile = () => {
  const { id } = useParams();
  const [profileCustomer, setProfileCustomer ] = useState(null);

  useEffect(() =>{
    const fetchData = async() =>{
      try{
        const data = await getSpecificCustomer({id})
        console.log(data.data)
        setProfileCustomer(data?.data);
      }catch(error){
        console.error("Error al traer la info del cliente:", error);
      }
    }
    fetchData();
  }, [])

  if(!profileCustomer){
    return <div>cargando perfil...</div>
  }


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Perfil del Cliente</h1>
      </header>
      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.infoActions}>
            <h2>Información General</h2>
            <div className={styles.actions}>
              <div className={styles.edit}><EditIcon /></div>
              <div className={styles.delete}><TrashIcon /></div>
            </div>
          </div>
          <div className={styles.separatorLine} />
          <div className={styles.bodyCard}>
            <div className={styles.presentation}>
              <div>
                <strong>{profileCustomer.customerName}</strong>
              </div>
              <div className={`${styles.customerTypeContainer} ${styles[profileCustomer.customerType.toLowerCase()]}`}>
                {profileCustomer.customerType.toLowerCase()}
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
            {/* <div className={styles.containerStatus}>
              <div className={styles.billingState}>
                Estado ultima factura: 
                <div className={`${styles[profileCustomer.customerStatusPayment.toLowerCase()]}`}>
                  {profileCustomer.customerStatusPayment.toLowerCase()}
                </div>
              </div>
              <div className={styles.billingPeriod}>
                Fecha de vencimiento:
                <div className={styles.date}>
                  ####
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className={styles.containerKPI}>
        <div>
          <div>
            Title
          </div>
          <div>
            Numero - Nombre
          </div>
        </div>
        <div>
          <div>
            Title Payment
          </div>
          <div>
            Numero - Nombre
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
