import "./ui/ui.scss";

import "./app.scss";
import Cards from "./Cards/Cards.jsx"

function App() {
  return (
    <div className="section">
      <div className="back-image"></div>
      <div className="container">
        <img src="./title.png" className="app__title"/>
        <Cards />
      </div>
    </div>
  )
}

export default App