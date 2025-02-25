import { RiOpenSourceFill } from "react-icons/ri";
import { Ampersand } from "lucide-react";
import { HiMiniHeart } from "react-icons/hi2";

const PoweredBySection = () => {
  return (
    <section id="love" className="py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-8 ">Powered by</h2>
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <div className="bg-green-400 rounded-full flex items-center p-4 lg:px-8 sm:mb-0">
            <RiOpenSourceFill size={40} className="my-auto mr-2 lg:size-22" />
            <h1 className="text-4xl lg:text-8xl font-extrabold">libre</h1>
          </div>
          <Ampersand size={40} className="m-4 lg:my-8 lg:size-22" />
          <div className="bg-red-400 rounded-full flex items-center p-4 lg:px-8">
            <HiMiniHeart size={40} className="my-auto mr-2 lg:size-24" />
            <h1 className="text-4xl lg:text-8xl font-extrabold">love</h1>
          </div>
        </div>
        <p className="text-center text-md lg:text-lg mt-8 max-w-2xl mx-auto">
          We believe in the power of open source to positively impact the world. That&#39;s why we empower you with the infrastructure to explore how it can make a positive integration into your life.
        </p>
      </div>
    </section>
  )
}

export default PoweredBySection;