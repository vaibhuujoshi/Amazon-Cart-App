import { useState } from 'react'
import viteLogo from '/vite.svg'
import { NavBarComponent } from './components/NavBar'
import { WishListComponent } from './components/WishList'
import { RecoilRoot } from 'recoil'
import { AmazonCartComponent } from './components/AmazonCart'
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

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
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<WishListComponent />}></Route>
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