import React from 'react';
import api from '../../utils/api';
import styles from './PetDatails.module.css';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import useFleshMessage from '../../hooks/useFlashMessage';

const PetDatails = () => {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFleshMessage();
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet);
    });
  }, [id]);

  return (
    <div>
      <h1>{pet.name}</h1>
    </div>
  );
};

export default PetDatails;
