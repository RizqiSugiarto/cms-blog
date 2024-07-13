import RouterComponent from './router';
import { AuthContextProvider } from './context/authContext';
import { BlogContextProvider } from './context/blogContext';
import { UnsavedChangesProvider } from './context/unsavedChangesContext';

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
        </>
    );
}

export default App;
