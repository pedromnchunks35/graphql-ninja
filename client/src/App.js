/* COMPONENTS IMPORT */
import Addbook from "./components/Addbook";
import BookList from "./components/BookList";


function App() {
  return (
    /* PRINCIPAL DIV */
    <div id="main">
     <h1>Ninja is op</h1>
       {/* BOOK LIST COMPONENT */}
       <BookList></BookList>
       {/* ADD BOOK HOOK */}
       <Addbook></Addbook>
     
    </div>
  );
}

export default App;
