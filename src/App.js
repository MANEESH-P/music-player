import { useEffect } from "react";
import './App.scss';
import './sass/main.scss';
import Home from "./home";

function App() {

  useEffect(() => {
    let popup = document.getElementById('popup');
    popup.addEventListener('click', function () {
      let songContainer = document.getElementById('songs-container');
      songContainer.classList.toggle('overlay')
      let footer = document.getElementById('footer');
      footer.classList.toggle('expanded')
    })
  },[])

  return (
    <div className="container dark">
      <Home />
    </div>
  );
}

export default App;
