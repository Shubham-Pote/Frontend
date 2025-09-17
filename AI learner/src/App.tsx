import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import SignIn from "./pages/Signin"
import SignUp from "./pages/SignUp"

// Simple placeholder pages

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
