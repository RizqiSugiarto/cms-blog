import RouterComponent from './router';
import { AuthContextProvider } from './context/authContext';

function App() {
    return (
        <>
        <AuthContextProvider>
            <RouterComponent />
        </AuthContextProvider>
        </>
    );
}

export default App;
