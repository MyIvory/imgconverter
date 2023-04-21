import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="uk">
      <Head>
        <meta
          name="google-site-verification"
          content="lvvgLX1e7UpIk83saZtbjqL7usZPmsCs44yWzmqJvno"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          rel="alternate"
          hreflang="en"
          href="https://easytext.vercel.app/en"
        />
        <link
          rel="alternate"
          hreflang="uk"
          href="https://easytext.vercel.app"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://easytext.vercel.app/en" />
        <link rel="canonical" href="https://easytext.vercel.app" />
        <meta
          name="description"
          lang="en"
          content="EasyText is a powerful tool that lets you extract text from screenshots and images effortlessly. Whether you're a student, researcher, or just someone who needs to quickly convert an image into editable text, EasyText is the solution for you."
        />
        <meta
          name="description"
          lang="uk"
          content="EasyText - це потужний інструмент, який дозволяє витягувати текст зі скріншотів та зображень легко та швидко. Незалежно від того, чи ви студент, дослідник, або просто хтось, хто швидко потребує конвертувати зображення в редагований текст, EasyText - це рішення для вас."
        />
        <meta
          name="title"
          lang="en"
          content="EasyText - Extracting Text from Screenshots and Images"
        />
        <meta
          name="title"
          lang="uk"
          content="Видобування тексту зі знімків екрану та зображень "
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="EasyText - Видобування тексту зі знімків екрану та зображень "
        />
        <meta
          property="og:description"
          content="EasyText - це потужний інструмент, який дозволяє витягувати текст зі скріншотів та зображень легко та швидко. Незалежно від того, чи ви студент, дослідник, або просто хтось, хто швидко потребує конвертувати зображення в редагований текст, EasyText - це рішення для вас."
        />
        <meta
          property="og:title"
          content="EasyText - Extracting Text from Screenshots and Images"
        />
        <meta
          property="og:description"
          content="EasyText is a powerful tool that lets you extract text from screenshots and images effortlessly. Whether you're a student, researcher, or just someone who needs to quickly convert an image into editable text, EasyText is the solution for you."
        />
        <meta property="og:url" content="https://easytext.vercel.app" />
        {/*  <meta
          property="og:image"
          content="https://example.com/images/easytext.png"
        /> */}
        <meta property="og:image:alt" content="EasyText logo" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="uk_UA" />
        <meta property="og:locale:alternate" content="en_US" />
        <script
          src="https://cdn.tiny.cloud/1/k8hk86kuqv28tv797qm250k1wpqak5b4w6gksbtsq50w27rm/tinymce/6/tinymce.min.js"
          referrerPolicy="origin"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
