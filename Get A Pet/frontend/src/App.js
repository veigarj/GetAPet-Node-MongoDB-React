import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Message from './components/layout/Message';

// Pages
import Login from './components/pages/Auth/Login';
import Home from './components/pages/Home';
import Register from './components/pages/Auth/Register';
import Profile from './components/pages/User/Profile';
import MyPets from './components/pages/Pet/MyPets';
import AddPet from './components/pages/Pet/AddPet';
import EditPet from './components/pages/Pet/EditPet';
// context
import { UserProvider } from './components/context/UserContext';
import PetDatails from './components/pages/Pet/PetDatails';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Navbar />
          <Message />
          <Container>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/pet/mypets" element={<MyPets />} />
              <Route path="/pet/add" element={<AddPet />} />
              <Route path="/pet/edit/:id" element={<EditPet />} />
              <Route path="/pet/:id" element={<PetDatails />} />
            </Routes>
          </Container>
          <Footer />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
