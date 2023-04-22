import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SongList from './components/SongList';
import CreateSong from './components/CreateSong';
import SongDetail from './components/SongDetail';




//Instance of Apollo Client (this gets passed to the provider)
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <React.StrictMode>
       
        <ApolloProvider client={client}>
                <Routes>
                    <Route path="/" element={<SongList />} />
                    <Route path="/create" element={<CreateSong />} />
                    <Route path="/view/:id" element={<SongDetail />} />
                
            </Routes>
    </ApolloProvider>
        </React.StrictMode>
    </BrowserRouter>
);




