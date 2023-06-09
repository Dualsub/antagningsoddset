import Footer from "./components/Footer";

export const App = () => {
  return <div className="bg-white">
    <div className="max-w-2xl w-full mx-auto flex flex-col justify-start items-center h-screen">
      <h1 className="text-3xl font-bold my-8">🎲 Antagningsoddset</h1>
    
      <Footer />
    
    </div>
  </div>;
};