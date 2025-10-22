import { useState } from 'react'
import viteLogo from '/vite.svg'
import { NavBarComponent } from './components/NavBar'
import { WishListComponent } from './components/WishList'
import { RecoilRoot } from 'recoil'
import { AmazonCartComponent } from './components/AmazonCart'
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

defineConfig({
  plugins: [react()],
  base: '/Amazon-Cart-App/'  // <--- important for GitHub Pages
})

function App() {

  return (
    <RecoilRoot>
      {/* <NavBarComponent />
      <WishListComponent />
      <AmazonCartComponent /> */}
      <AmazonComponent />
    </RecoilRoot>
  )
}

function AmazonComponent() {
  return(
    <>
    <BrowserRouter basename="/Amazon-Cart-App">
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<WishListComponent />}></Route>
            <Route path='/cart' element={<AmazonCartComponent />}></Route>
          </Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

function Layout() {
    return (
      <>
        <NavBarComponent />
        <Outlet />
      </>
    )
  }


function ErrorPage() {
    const navigate = useNavigate()

    function redirectUser() {
      navigate("/")
    }

    return (
      <>
        <br />
        <br />
        <br />
        <img src="https://static.allen.in/_next/static/media/404.358570ba.png" alt="404" height={140} />
        <br />
        <br
        />
        <h2>Content not found</h2>
        <button onClick={redirectUser}>Go Home</button>
      </>
    )
  }

export default App