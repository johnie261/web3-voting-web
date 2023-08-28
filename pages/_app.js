import { VotingProvider } from '@/Context/Voter'
import Navbar from '@/components/Navbar/Navbar'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return 
  <VotingProvider>
    <div>
      <Navbar />
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  </VotingProvider>
}
