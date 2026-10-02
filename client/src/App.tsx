import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { NuqsAdapter } from "nuqs/adapters/react";
import Dashboard from "./pages/dashboard/page";
import TaskForm from "./pages/dashboard/forms/TaskForm";

function App() {
  return (
    <NuqsAdapter>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route element={<Layout/>} 
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/task/create" element={<TaskForm isEditing={false} />} />
            <Route path="/task/edit/:id" element={<TaskForm isEditing={true} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NuqsAdapter>
  );
}

export default App