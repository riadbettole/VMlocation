import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SignUp from '../component/SignIn'
import Footer from '../component/Footer'

export default function Home() {
  return (
    <div className='text-3xl'>
      <SignUp/>
      <div className='p-24'></div>
      <Footer/>
    </div>
  )
}
