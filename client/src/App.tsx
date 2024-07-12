import RouterComponent from './router';
import { AuthContextProvider } from './context/authContext';
import { BlogContextProvider } from './context/blogContext';

function App() {
    return (
        <>
            <AuthContextProvider>
                <BlogContextProvider>
                <RouterComponent />
                </BlogContextProvider>
            </AuthContextProvider>
        </>
    );
}

export default App;
