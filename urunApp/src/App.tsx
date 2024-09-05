import { Provider } from "react-redux";
import Router from "./Router/Router";
import { store } from "./Store/store";
import { QueryClient, QueryClientProvider } from "react-query";


export const calisanQueryClient = new QueryClient();
function App() {

  return (
    <QueryClientProvider client={calisanQueryClient}>
    <Provider store={store}>
      
           <Router/>

    </Provider>
    </QueryClientProvider>
  );
}

export default App;
