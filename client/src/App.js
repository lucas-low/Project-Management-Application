import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Clients from "./components/Clients";
import AddClientModal from "./components/AddClientModal";

const cache = new InMemoryCache({
  typePolicies: {//this is to make sure that the cache is always up to date with the data in the database
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: { 
          merge(existing, incoming) { 
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({ 
  cache: new InMemoryCache(),
  uri: 'http://localhost:5000/graphql',
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
          <div className='container'>
          <AddClientModal />
           <Clients />
          </div> 
    </ApolloProvider>
    </>
  );
}

export default App;
