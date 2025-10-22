import { useState } from 'react'
import viteLogo from '/vite.svg'
import { NavBarComponent } from './components/NavBar'
import { WishListComponent } from './components/WishList'
import { RecoilRoot } from 'recoil'

function App() {

  return (
    <RecoilRoot>
      <NavBarComponent />
      <WishListComponent />
    </RecoilRoot>
  )
}

export default App