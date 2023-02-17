import api from '../../utils/api';
import React from 'react';

import styles from '../Pet/Dashboard.module.css';

import { useEffect, useState } from 'react';
import useFlashMessage from '../../hooks/useFlashMessage';

const MyAdoptions = () => {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    api
      .get('/pets/myadoptions', {
        headers: {
          Authorization: `Berer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
        console.log(pets);
      });
  }, [token]);
  return (
    <section>
      <div className={styles.pelist_header}>
        <h1>Minhas Adoções</h1>
      </div>
      <div className={styles.petlist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet.id} className={styles.petlist_row}>
              <div
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
                }}
                className={styles.pet_card_image}
              ></div>
              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Peso:</span> {pet.weight}kg
              </p>
              {/* cria uma logica caso o pet ja foi adotado */}
              {pet.available ? (
                <p>adoção em processo</p>
              ) : (
                <p className={styles.adopted_text}>Pet já adotado!</p>
              )}
            </div>
          ))}
        {pets.length === 0 && <p>Parabens por concluir a adoção</p>}
      </div>
    </section>
  );
};

export default MyAdoptions;
