import { useEffect, useState } from "react";
import styles from "./CustomerView.module.css";
import { StatsCard } from "../../ui/StatsCard/StatsCard";
import IconCustomer from "../../assets/customers.svg?react";
import { CustomerTable } from "../../ui/CustomerTable/CustomerTable";
import { deleteCustomerById, getAllCustomer } from "../../actions/customer.action";
import { CustomerModal } from "../CustomerModal/CustomerModal";
import AddButtonIcon from "../../assets/addButtonIcon.svg?react";
import SearchIcon from "../../assets/searchIcon.svg?react";
import { CustomerSelector } from "../../ui/CustomerSelector/CustomerSelector";
import { SelectorPaymentStatus } from "../../ui/StatusPayment/StatusPayment";
import SliderDJIcon from "../../assets/sliderDJIcon.svg?react"

export const CustomerView = () =>{
  const [showForm, setShowForm] = useState(false);
  const [dataCustomer, setDataCustomer] = useState([]);
  const [valueFilter, setValueFilter] = useState({
    value: "",
    type: ""
  });
  const [selectorFilter, setSelectorFilter] = useState({ value: "" });
  const [dataTypeFilter, setDataTypeFilter] = useState("");
  const [valueToggleOrder, setToggleOrder] = useState("asc"); 
  

  const toggleModalCustomer = (e) => {
    setShowForm(!showForm);
  }

  const handleChangeValue = (e) =>{
    const { name, value} = e.target;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const  datatype = selectedOption.dataset.type;

    setValueFilter((prevData) => ({
      ...prevData,
      value: value,
      type: datatype
    }));
    setSelectorFilter({ value: "" });
  }

  const handleValueSelectors = (e) =>{
    const { value } = e.target;
    setSelectorFilter({ value });
  }

  const toggleAscDesc = () =>{
    if(valueToggleOrder == "asc"){
      setToggleOrder("desc")
    }else{
      setToggleOrder("asc")
    }
  }

  const handleDeleteCall = async(customerId) =>{
    console.log(customerId)
    try{
      const data = await deleteCustomerById({customerId})
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const finalValue = valueFilter.type?.startsWith("op_selector") 
          ? selectorFilter.value 
          : valueFilter.value;

        const data = await getAllCustomer({
          type: valueFilter.type,
          valueSelector: finalValue,
          sort: valueToggleOrder,
        });
        setDataCustomer(data);
      } catch (error) {
        console.error("Error al traer los clientes:", error);
      }
    };
    fetchData();
  }, [valueFilter, selectorFilter, valueToggleOrder]);

  return (
    <>
      <section className={styles.containerHeader}>
        <p>Admin / <span>Customer</span></p>
        <button
          className={styles.addCustomer}
          onClick={toggleModalCustomer}
        >
          Agregar Customer
          <AddButtonIcon />
        </button>
      </section>
      <div className={styles.statsSection}>
        <div className={styles.cardContainer}>
          <StatsCard
            nameCard={"Total Customer"}
            numberCard={100}
            iconCard={IconCustomer}
          />
          <StatsCard
            nameCard={"Total Customer"}
            numberCard={100}
            iconCard={IconCustomer}
          />
          <StatsCard
            nameCard={"Total Customer"}
            numberCard={100}
            iconCard={IconCustomer}
          />
          <StatsCard
            nameCard={"Total Customer"}
            numberCard={100}
            iconCard={IconCustomer}
          />
        </div>
      </div>
      <section>
        <div className={styles.containerFilters}>
          <div className={styles.searchBar}>
            <SearchIcon className={styles.inputIcon} />
            <input
              placeholder="Buscar cliente..."
            />
          </div>
          <div className={styles.selectorFilter}>
            <SliderDJIcon 
              className={styles.selectorIcon}
            />
            <select 
              name="filterValue"
              onChange={handleChangeValue}
              value={valueFilter.value}
            >
              <option data-type="all" value="allCustomers">Todos</option>
              <option data-type="op_sort_name" value="customerName">Nombre</option>
              <option data-type="op_sort_date" value="customerDate">Fecha de creacion</option>
              <option data-type="op_selector_type" value="customerType">Tipo de cliente</option>
              <option data-type="op_selector_status" value="paymentStatus">Estado de pago</option>
            </select>
          </div>
            {valueFilter.type?.startsWith("op_sort") && (
              <button className={styles.orderButton} onClick={toggleAscDesc}>
                {valueFilter.value === "customerName" ? (
                  valueToggleOrder === 'asc' ? "A - Z" : "Z - A"
                ) : (
                  valueToggleOrder === 'asc' ? "Asc" : "Desc"
                )}
              </button>
            )}
          {valueFilter.type?.startsWith("op_selector") && (
            <>
              {valueFilter.value == "customerType" ?(
                <CustomerSelector
                  customStyle={{width: "25%"}}
                  onChange={handleValueSelectors}
                  value={selectorFilter.value}
                />
              ) : (
                <SelectorPaymentStatus 
                  onChange={handleValueSelectors}
                  value={selectorFilter.value}
                  customStyle={{width: "20%"}}
                />
              )}
            </>
          )}
        </div>
        <div>
          <CustomerTable
            data={dataCustomer}
            actionDelete={handleDeleteCall}
          />
          {showForm &&
            <CustomerModal
              onClose={toggleModalCustomer}
            />
          }
        </div>
      </section>
    </>
  );
}