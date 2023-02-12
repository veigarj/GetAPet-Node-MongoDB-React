import api from '../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from '.Home.module.css'

function Home() {
  const [pets, usePets] = useState([])

  // não precisa de estar logado
  // chama todos os pets
  useEffect(() => {
    api.get('/pets').them((response) => {
      setPets(response.data.pets)
    })
  }, [])
  return (
    <section>
      <div>
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
      </div>
      // cria um elemento para cada pet criado
      <div clasName={styles.pet_container}>
        {pets.length > 0 && pet.map((pet) => {
          <div clasName={styles.pet_card}>
            <p>Imagem do Pet</p>
            <h3>{pet.name}</h3>
            <p>
              <spam clasName='bold'>Peso:</spam> {pet.weight}kg
            </p>
            {pet.available ? (
              <Link to={`pet/${pet._id}`}>Mais detalhes</Link>
            ) : (<p>Adotado</p>)}
          </div>
        })}
        {pets.length === 0 && (<p>Não há pets cadastrados ou disponivel para adoção no momento</p>)}
      </div>
    </section>
  );
}

export default Home;
