export default function About() {
  return (
    <div className="main-content-container flex justify-center">
      <div className="instructions-container about-container flex-col align-center">
        <div className="instructions-text">About</div>
        <div className="about-item">
          This page was created using React (bootstrapped by{" "}
          <a class="about-link" href="https://create-react-app.dev/">
            create-react-app
          </a>
          ). The app uses a{" "}
          <a
            class="about-link"
            href="https://firebase.google.com/docs/firestore"
          >
            Firestore
          </a>{" "}
          database to verify fighter locations and store high scores. The source
          code for this site can be found at{" "}
          <a
            class="about-link"
            href="https://github.com/Corncycle/find-the-fighter"
          >
            this Github repository
          </a>
          .
        </div>
        <div className="about-item">
          I do not own the rights to any of the assets on this website. This
          page is not monetized and was created for educational purposes.
        </div>
        <div className="about-item">
          The high-quality mural image used can be found{" "}
          <a
            class="about-link"
            href="https://calyptus.de/211012_NSW_SSBUltimate_Illustration_Mural.jpg"
          >
            here
          </a>
          .
        </div>
        <div className="about-item">
          Fighter assets were scraped from{" "}
          <a class="about-link" href="https://www.smashbros.com/">
            smashbros.com
          </a>
          .
        </div>
      </div>
    </div>
  )
}
