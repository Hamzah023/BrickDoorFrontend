import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SelectDropdownSearch } from './screens/searchCommunitiesPage/selectDropDown'
import '@mantine/core/styles.css'; // Import Mantine's global styles


function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route path="/communities" element={<SelectDropdownSearch />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
