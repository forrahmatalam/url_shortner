import React, { useState } from 'react'

const App = () => {

  const [longUrl, setLongUrl] = useState("")
  const [customUrl, setCustomUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [history, setHistory] = useState([])


  // Shorten URL
  const handleShorten = (e) => {
    e.preventDefault()

    if (!longUrl) {
      return
    }

    const shortCode = customUrl
      ? customUrl
      : Math.random().toString(36).substring(2, 8)

    const newUrl = {
      id: Date.now(),
      original: longUrl,
      short: `short.ly/${shortCode}`
    }

    setShortUrl(newUrl.short)

    setHistory((prev) => [newUrl, ...prev])

    setLongUrl("")
    setCustomUrl("")
  }


  // Copy URL
  const handleCopy = (url) => {
    navigator.clipboard.writeText(url)
  }


  // Delete URL
  const handleDelete = (id) => {
    setHistory((prev) => {
      return prev.filter((item) => item.id !== id)
    })
  }


  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            URL<span className="text-blue-500">Shortener</span>
          </h1>

          <button
            className="px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800"
          >
            History
          </button>

        </div>
      </header>


      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-16">

        {/* Hero */}
        <div className="text-center mb-10">

          <p className="text-blue-500 font-medium mb-3">
            SIMPLE • FAST • FREE
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Shorten your long URLs
          </h2>

          <p className="text-slate-400">
            Create short, shareable links in seconds.
          </p>

        </div>


        {/* URL Form */}
        <form
          onSubmit={handleShorten}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl"
        >

          {/* Long URL */}
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Long URL
          </label>

          <input
            type="url"
            placeholder="https://example.com/your/very/long/url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          />


          {/* Custom URL */}
          <label className="block text-sm font-medium text-slate-300 mt-5 mb-2">
            Custom short URL <span className="text-slate-500">(optional)</span>
          </label>

          <div className="flex">

            <span className="bg-slate-800 border border-slate-700 border-r-0 rounded-l-xl px-4 flex items-center text-slate-400">
              short.ly/
            </span>

            <input
              type="text"
              placeholder="my-link"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-r-xl px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>


          {/* Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-500 transition rounded-xl py-3 font-semibold"
          >
            Shorten URL
          </button>

        </form>


        {/* Latest Result */}
        {shortUrl && (
          <div className="mt-6 bg-blue-950/40 border border-blue-900 rounded-xl p-5">

            <p className="text-sm text-slate-400 mb-2">
              Your shortened URL
            </p>

            <div className="flex items-center gap-3">

              <p className="text-blue-400 font-semibold flex-1">
                {shortUrl}
              </p>

              <button
                onClick={() => handleCopy(shortUrl)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
              >
                Copy
              </button>

            </div>

          </div>
        )}


        {/* History */}
        <section className="mt-14">

          <div className="flex justify-between items-center mb-5">

            <h3 className="text-2xl font-bold">
              Previous URLs
            </h3>

            <span className="text-sm text-slate-500">
              {history.length} links
            </span>

          </div>


          {history.length === 0 ? (

            <div className="border border-dashed border-slate-700 rounded-xl p-10 text-center text-slate-500">
              No shortened URLs yet.
            </div>

          ) : (

            <div className="space-y-4">

              {history.map((item) => (

                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5"
                >

                  <div className="flex flex-col md:flex-row md:items-center gap-4">

                    <div className="flex-1 min-w-0">

                      <p className="text-sm text-slate-500 mb-1">
                        Original URL
                      </p>

                      <p className="truncate text-slate-300">
                        {item.original}
                      </p>

                      <p className="text-blue-400 mt-2 font-medium">
                        {item.short}
                      </p>

                    </div>


                    <div className="flex gap-2">

                      <button
                        onClick={() => handleCopy(item.short)}
                        className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700"
                      >
                        Copy
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  )
}

export default App
