import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout";
import Wmatieres from "./components/Wmatiere/Wmatieres";
import Wmention from "./components/Wmention/Wmention";
import Woptions from "./components/Woptions/Woptions";
import Wusers from "./components/Wusers/Wusers";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={"home page"} />
        <Route path="/user" element={<Wusers />} />
        <Route path="/mention" element={<Wmention/>} />
        <Route path="/option" element={<Woptions />} />
        <Route path="/matiere" element={<Wmatieres />} />
        <Route path="/emploi_temp" element={"emploi du temps"} />
        <Route path="/apropos" element={"apropos"} />
        <Route path="*" element={"404 not found"} />
      </Routes>
    </Layout>

  );
}

export default App;
