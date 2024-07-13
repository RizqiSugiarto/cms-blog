import RouterComponent from './router';
import { AuthContextProvider } from './context/authContext';
import { BlogContextProvider } from './context/blogContext';
import { UnsavedChangesProvider } from './context/unsavedChangesContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <AuthContextProvider>
                <BlogContextProvider>
                    <UnsavedChangesProvider>
                        <RouterComponent />
                    </UnsavedChangesProvider>
                </BlogContextProvider>
            </AuthContextProvider>
            <ToastContainer />
        </>
    );
}

export default App;
