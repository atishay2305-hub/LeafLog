import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>LeafLog</title>
        <meta name="description" content="Login or Register" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="bg-green-200 min-h-screen flex items-center justify-center">
        <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">LeafLog</h1>
          <div className="space-x-4">
            <Link href="/login">
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-medium transition duration-300">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-medium transition duration-300">
                Register
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
