import Dataview from "./components/dataview"
import Layout from "./layout"
import MainPage from "./pages/main"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Layout>
    <MainPage>
      <Dataview/>
    </MainPage>
    <ToastContainer />
    </Layout>
  )
}

export default App
