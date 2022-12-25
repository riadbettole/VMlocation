import { user } from '@prisma/client'
import { prisma } from '../lib/prisma'
import Login from '../component/Login'
import Footer from '../component/Footer'

interface props{
  users:user[];
}

export default function Home({users}:props) {
  return (
    <div className='text-3xl'>
      <Login users={users}/>
      <div className='p-20'></div>
      <Footer/>
    </div>
  )
}

export async function  getStaticProps(){
  const users: user[] = await prisma.user.findMany();
  return {
    props: {users}
  }
}