import { data } from "autoprefixer";
import axios from "axios";
import Head from "next/head";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import requests from "../utils/requests";

export default function Home({ results }) {
  const onCaptchaChange = (token) => {
    console.log(token);
  };

  return (
    <div>
      <Head>
        <title>Video Streaming Platform</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=UA-215791117-1`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-215791117-1', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <Header />
      <Nav />
      <Results results={results} />
      <ReCAPTCHA
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        onChange={onCaptchaChange}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await axios
    .get(
      `https://api.themoviedb.org/3${
        requests[genre]?.url || requests.fetchTrending.url
      }`
    )
    .then(({ data }) => data);

  return {
    props: {
      results: request.results,
    },
  };
}
