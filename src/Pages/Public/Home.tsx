// Components - in public folder
import HomeHeroImage from '../../Components/Public/Home/HomeHeroImage';
import HomeHeroHeader from '../../Components/Public/Home/HomeHeroHeader';
import Footer from '../../Layouts/Footer';

function Home() {
  return (
    <>
      <div className="mt-20 h-auto sm:mb-20 md:mb-4 md:mt-10 md:max-h-[75vh] md:h-[75vh] md:w-[75vw] md:px-1">
        <section className="bg-white">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 space-x-4">
            <HomeHeroHeader />
            <HomeHeroImage />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
