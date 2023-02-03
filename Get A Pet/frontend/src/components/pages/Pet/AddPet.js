import api from '../../utils/api';

import styles from './AddPets.module.css';

import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import PetForm from '../../form/PetForm';

// Hooks
import useFlashMessage from '../../hooks/useFlashMessage';

const AddPet = () => {
  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastrar um Pet</h1>
        <p>Depois ele ficara disponivel para adoção</p>
      </div>
      <PetForm btnText="Cadastrar Pet" />
    </section>
  );
};

export default AddPet;
