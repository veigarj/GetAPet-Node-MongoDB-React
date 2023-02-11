import api from '../../utils/api';
import styles from './AddPets.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PetForm from '../../form/PetForm';

// Hooks
import useFlashMessage from '../../hooks/useFlashMessage';

const AddPet = () => {
  // pegar o token do localstorage
  const [token] = useState(localStorage.getItem('token') || '');
  // usar flashMessage
  const { setFlashMessage } = useFlashMessage();
  const history = useNavigate();

  async function registerPet(pet) {
    let msgType = 'success';

    const formData = new FormData();

    // pega cada item do pet e joga em formData
    await Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        // percorrer rodas as imagens e joga dentro de um array [images]
        for (let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i]);
        }
      } else {
        // acessar o obj pelo nome da chave
        formData.append(key, pet[key]);
      }
    });

    // envia um post onde invia o formData no body(corpo da requisição) com o cabeçalho
    const data = await api
      .post('pets/create', formData, {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = 'error';
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);

    if (msgType !== 'erro') {
      history('/pets/mypets');
    }
  }
  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastrar um Pet</h1>
        <p>Depois ele ficara disponivel para adoção</p>
      </div>
      <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
    </section>
  );
};

export default AddPet;
