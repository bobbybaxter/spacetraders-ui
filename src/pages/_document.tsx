import Document, { Head, Html, Main, NextScript } from 'next/document';
import { baiJamjuree, spaceMono } from '@/helpers/fonts';

class MyDocument extends Document {
  render() {
    return (
      <Html className={`dark ${spaceMono.variable} ${baiJamjuree.variable} `}>
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://unpkg.com/augmented-ui@2/augmented-ui.min.css"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
