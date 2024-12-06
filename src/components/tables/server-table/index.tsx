export default function ServerTable() {
  return (
    <>
    <div className="md:hidden">
      <h1>I'm a mobile screen</h1>
    </div>
    <div className="hidden md:block">
      <h1>I'm not a mobile screen</h1>
    </div>
    </>
  )
}

