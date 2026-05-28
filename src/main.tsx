import { createRoot } from 'react-dom/client'
import './assets/global.css'
import { Layout } from './layout/Layout'
import { Provider } from 'react-redux'
import { store } from './redux/store'

createRoot(document.getElementById('root')!).render(
<Provider store={store}>
    <Layout />
</Provider>
)
