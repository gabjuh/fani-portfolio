import PageContainer from "./PageContainer"
import Hero1 from "./widgets/Hero1"
import Events from "./Pages/Events"

const Home = () => {
  return (
      <>
        <Hero1 />
        <PageContainer>
          <div className="pt-[100px]" id="about-me">About me</div>
          <div className="h-[1200px] "></div>
          <div className="pt-[100px]" id="ensembles">Ensembles</div>
          <div className="h-[1200px] "></div>
          <div className="pt-[100px]" id="concerts">Concerts</div>
          <Events />
          <div className="pt-[100px]" id="media">Media</div>
          <div className="h-[1200px] "></div>
          <div className="pt-[100px]" id="contacts">Contact</div>
          <div className="h-[1200px] "></div>
        </PageContainer>
      </>
  )
}

export default Home